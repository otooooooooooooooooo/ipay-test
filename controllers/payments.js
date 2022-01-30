const {getNewOrderId, generatePaymentsPage} = require('../services/payments.js')

const createOrder = (req, res) => {
    const body = req.body
    let newOrderId
    try {
        newOrderId = getNewOrderId(body['order_details']);
    } catch (ex) {
        res.status(400)
        res.end(ex.message)
        return
    }
    generatePaymentsPage(newOrderId, body['redirect_url'])
        .then(response => JSON.stringify(response))
        .then(data => {
            res.write(data);
            res.end();
        })
}

const processCallback = (req, res) => {

}

module.exports = {createOrder, processCallback}