require('dotenv').config({ path: './env/.env' })
const express = require('express')
const  cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.use('/paypal',require('./components/paypal/paypal.controller'));
app.use('/yappy',require('./components/yappy/yappy.controller'))
app.use('/usuarios', require('./components/users/usuarios.controller'));
app.use('/entidades',require('./components/entities/entidades.controller'));
app.use('/clientEntities',require('./components/clientEntities/clientEntities.controller'));
require("./components/clients/clients.routes")(app);
require("./components/transacciones/transacciones.routes")(app);

app.get('/', (req, res) => {
  res.send("Hello W!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})