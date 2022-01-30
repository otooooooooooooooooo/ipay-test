const {getProductName, getProductPrice} = require('../repositories/productsRepository.js')

function getDescription(order) {
    return 'Product: ' + getProductName(order['product_id']) + ', quantity: ' + order['quantity']
}

function getTotalAmount(order) {
    return getProductPrice(order['product_id']) * order['quantity']
}


module.exports = {getDescription, getTotalAmount}