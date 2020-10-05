const express = require('express');
const app = express();
const util = require('util');

let shoppingRouter = express.Router();
let customoerRouter = express.Router();
app.use('/shopping', shoppingRouter);
app.use('/customer', customoerRouter);

// localhost:3000/query?id=kim
app.get('/', function(request, response){
response.send('<h1>Root Router</h1>');
});
shoppingRouter.get('/', function(request, response){
    response.send('<h1>Shopping Router Index</h1>');
    });
customoerRouter.get('/',function(request, response){
    response.send('<h1>Customer Router</h1>');
    });

app.get('*', (request, response)=>{
    response.status(404).send('Path not found');  // 메소드 채이닝
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000');
})