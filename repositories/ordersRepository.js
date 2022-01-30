const {register} = require('../repositories/generalRepository')
const {findById} = require("./generalRepository");


const orders = [
    {
        "id": "1",
        "customer": "Josh",
        "product_id": 2,
        "quantity": 3,
        "payment_finished": true,
        "successful": false
    },
    {
        "id": "2",
        "customer": "Hanna",
        "product_id": 3,
        "quantity": 1,
        "payment_finished": true,
        "payment_successful": true
    }
]

const registerOrder = orderDetails => {
    orderDetails['payment_finished'] = false
    orderDetails['payment_successful'] = false
    return register(orderDetails, orders)
}

const findOrder = id => findById(id, orders)

module.exports = {registerOrder, findOrder, orders}