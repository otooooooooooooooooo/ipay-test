const express = require('express')
const app = express()

const payments = require('./routes/payments')
const orders = require('./routes/orders')

app.use(express.json())

app.use('/payments', payments);
app.use('/orders', orders);

app.listen(8888);
