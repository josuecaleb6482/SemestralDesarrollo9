require("dotenv").config();

const express = require("express")
const app = express()

const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./users/routes/users.routes")(app);
require("./clientes/routes/clientes.routes")(app);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})