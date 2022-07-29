const axios = require('axios').default;
const express = require('express');
const app = express.Router();

var transaccion = {
    numTran: '',
    idCliente: 1,
    idServ: '',
    numCuenta: '',
    monto: '',
    saldoInicial: '',
    saldoActual: ''
}
const createPayment = async (req, res) => {
    const { price: total, idCliente, idService, balance, account } = req.body;
    transaccion = {
        ...transaccion,
        idCliente: idCliente,
        idServ: Number(idService),
        numCuenta: account,
        monto: total,
        saldoInicial: balance,
        saldoActual: Number(balance - total)
    }
    const order = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: total
            }
        }],
        application_context: {
            brand_name: 'PagosOnline.com',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `http://localhost:3000/paypal/execute-payment`,
            cancel_url: `http://localhost:3000/paypal/cancel-payment`
        }
    }
    try {
        const { data } = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
            auth: {
                username: process.env.PAYPAL_CLIENT,
                password: process.env.PAYPAL_SECRET
            }
        })
        res.json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

const executePayment = async (req, res) => {
    let { token } = req.query;
    transaccion.numTran = token;

    try {
        //capture money
        await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: process.env.PAYPAL_CLIENT,
                password: process.env.PAYPAL_SECRET
            }
        })
        //save transanccion
        await axios.post('http://localhost:3000/api/transacciones/', {
            ...transaccion
        })
        //update client balance
        await axios.put('http://localhost:3000/clientEntities/update', {
            account: transaccion.numCuenta,
            saldoActual: transaccion.saldoActual
        })

    } catch (error) {
        res.status(400).json(error);
    }
    res.redirect(`http://127.0.0.1:5500/frontend/services.html?bill=${token}`)
}

const cancelPayment = (req, res) => {
    res.redirect('http://127.0.0.1:5500/frontend/services.html');
}

app.post(`/create-payment`, createPayment)
app.get(`/execute-payment`, executePayment)
app.get('/cancel-payment', cancelPayment)

module.exports = app