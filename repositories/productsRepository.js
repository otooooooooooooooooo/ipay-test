const {existsById, findById} = require('../repositories/generalRepository')

const products =
    [
        {
            "id": 1,
            "name": "cake",
            "price": 35.99
        },
        {
            "id": 2,
            "name": "croissant",
            "price": 6.99
        },
        {
            "id": 3,
            "name": "candy",
            "price": 1.99
        }
    ]

const productExists = id => existsById(id, products)

const findProduct = id => findById(id, products)

const getProductPrice = id => findProduct(id)['price']

const getProductName = id => findProduct(id)['name']

module.exports = {productExists, getProductPrice, getProductName}