const express = require('express');
const shoppingRouter = express.Router();
let customoerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customoerRouter);
shoppingRouter.get('/', function(request, response){
    response.send('<h1>Shopping Router Index</h1>');
    });
customoerRouter.get('/',function(request, response){
    response.send('<h1>Customer Router</h1>');
    });
module.exports = shoppingRouter