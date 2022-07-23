const request = require('request')
const axios = require('axios')
const express = require('express')
const app = express.Router();
var auth = ''
var transaccion ={
    idCliente : 1,
    idServ : '',
    monto : '',
    saldoInicial : '',
    saldoActual : ''   
}
var cuenta = ''
const createPayment = async (req, res) => {
    const { price: total,idCliente,idService, balance, account} = req.body
    cuenta = account
    transaccion = {
        ...transaccion,
        idCliente:idCliente,
        idServ:Number(idService),
        monto:total,
        saldoInicial : balance,
        saldoActual : Number(balance-total)
    }
    auth = { user: process.env.PAYPAL_CLIENT, pass: process.env.PAYPAL_SECRET }
 
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: total
            }
        }],
        application_context: {
            brand_name: `MiTienda.com`,
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `http://localhost:3000/paypal/execute-payment`,
            cancel_url: `http://localhost:3000/paypal/cancel-payment`
        }
    }

    request.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })    
}

const executePayment = (req, res) => {
    const {token} = req.query; //<-----------
    request.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        console.log(transaccion)
        request.post('http://localhost:3000/api/transacciones/',{
            auth : {},
            body : transaccion,
            json:true
        },(err,response)=>{
            console.log(response)
        })
        axios.put('http://localhost:3000/clientEntities/update',{
            account : cuenta,
            saldoActual:transaccion.saldoActual
        })
        res.json({ data: "pagó con éxito" })
    })

    //aqui restar saldo
    
}

app.post(`/create-payment`, createPayment)
app.get(`/execute-payment`, executePayment)

module.exports  = app