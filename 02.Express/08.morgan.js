const express = require('express');
const morgan = require('morgan');
const util = require('util');
let app = express();
//app.use(morgan(':method + :date + :remote-addir'));
app.use(morgan('short'))
app.use(function(request, response){
    response.send('<h1>express Basic</h1>');
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000');
});