const {productExists} = require("../repositories/productsRepository");
const {registerOrder, findOrder} = require("../repositories/ordersRepository")
const {getDescription} = require("./orders")

const fetch =  require('node-fetch')
const {getTotalAmount} = require("./orders");

const MERCHANT_CREDENTIALS = 'MTAwNjo1ODFiYTVlZWFkZDY1N2M4Y2NkZGM3NGM4MzliZDNhZA=='
const ipay_url = 'https://dev.ipay.ge/opay/api/v1'


function getNewOrderId(orderDetails) {
    if (!productExists(orderDetails['product_id']))
        throw new Error('Product does not exist')
    return registerOrder(orderDetails)
}

//promise of payment page
function generatePaymentsPage(orderId, redirectURL) {
    return getPaymentAccessToken()
            .then(token =>
            fetch(ipay_url + '/checkout/orders',
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(generateRequestBody(orderId, redirectURL))
                }).then(response => response.json())
                .then(data => data['links'])
                .then(linksObject => linksObject.find(link => link.rel === 'approve'))
                .then(link => link['href'])
        )
}

//returns promise of access token : string
function getPaymentAccessToken() {
    return fetch(ipay_url + '/oauth2/token',
        {
            method: 'POST',
            headers: {
                accept: "application/json",
                Authorization: "Basic " + MERCHANT_CREDENTIALS,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        }
    ).then(response => response.json())
        .then(data => data['access_token'])
}

function generateRequestBody(orderId, redirectURL) {
    const order = findOrder(orderId)
    const productId = order['product_id']
    const totalAmount = getTotalAmount(order).toString()
    return {
        "intent": "CAPTURE",
        "items": [
            {
                "amount": totalAmount,
                "description": getDescription(order),
                "quantity": parseInt(order['quantity']),
                "product_id": productId.toString()
            }
        ],
        "redirect_url": redirectURL,
        "shop_order_id": orderId.toString(),
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "GEL",
                    "value": totalAmount
                },
                "industry_type": "ECOMMERCE"
            }
        ]
    }
}

module.exports = {getNewOrderId, generatePaymentsPage}

