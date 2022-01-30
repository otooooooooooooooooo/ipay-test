const express = require('express')
const router = express.Router()
const {createOrder, processCallback} = require('../controllers/payments')

router.route('/create-order').post(createOrder)

router.route('/callback').post(processCallback)

module.exports = router