const axios = require('axios');
const express = require("express");
const { createClient } = require("yappy-node-back-sdk");
const { v4: uuidv4 } = require("uuid");
const app = express.Router();

let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);

const payment = {
    total: null,
    subtotal: null,
    shipping: 0.0,
    discount: 0.0,
    taxes: null,
    orderId: null,
    successUrl: "http://localhost:3000/yappy/pay-success",
    failUrl: "http://localhost:3000/yappy/pay-cancel",
    tel: process.env.TEL || "60000000",
    domain: process.env.DOMAIN || "https://yappy.peqa.dev",
};

var transaccion = {
    numTran: '',
    idCliente: 1,
    idServ: '',
    numCuenta: '',
    monto: '',
    saldoInicial: '',
    saldoActual: ''
}

app.post("/api/pagosbg", async (req, res) => {
    const { price, idCliente, idService, balance, account } = req.body;

    const uuid = uuidv4();
    const taxes = Number((price * 0.07).toFixed(2));
    const total = price + taxes;

    const newPayment = {
        ...payment,
        subtotal: 0.01, // Para evitar tener que pagar durante la prueba
        taxes: 0.01, // Para evitar tener que pagar durante la prueba
        total: 0.02, // Para evitar tener que pagar durante la prueba
        orderId: uuid.split("-").join("").slice(0, 10),
    };
    transaccion = {
        ...transaccion,
        numTran: newPayment.orderId,
        idCliente: idCliente,
        idServ: Number(idService),
        numCuenta: account,
        monto: price,
        saldoInicial: balance,
        saldoActual: Number(balance - price)
    }
    const response = await yappyClient.getPaymentUrl(newPayment, false, true);
    res.json(response);
});

app.get('/pay-success', async (req, res) => {
    try {        
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

    res.redirect(`http://127.0.0.1:5500/frontend/services.html?bill=${transaccion.numTran}`)
})

app.get('/pay-cancel', (req, res) => {
    res.redirect('http://127.0.0.1:5500/frontend/services.html');
})

module.exports = app;