const {orders} = require('../repositories/ordersRepository.js')

const getAllOrders = (req, res) => {
    res.write(JSON.stringify(orders))
    res.end()
}

module.exports = {getAllOrders}
