 
/*const express = require('express');
const app = express();
 
const cors = require("cors"); 

const errorHandler = require( './_middleware/error-handler');

//app.use(json());
//app.use(urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/usuarios', require('./users/usuarios.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3000) : 3000;
console.log(port)
app.listen(port, () => console.log('Server listening on port ' + port));*/
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use('/usuarios', require('./users/usuarios.controller'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})