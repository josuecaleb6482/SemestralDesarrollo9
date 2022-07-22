require('dotenv').config({ path: './env/.env' })
const express = require('express')
const  cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000
app.set()

app.use('/usuarios', require('./components/users/usuarios.controller'));
app.use('/entidades',require('./components/entities/entidades.controller'));
app.use('/clientEntities',require('./components/clientEntities/clientEntities.controller'));
require("./components/clients/clients.routes")(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})