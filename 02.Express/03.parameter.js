const express = require('express');
const { response } = require('express');
const app = express();
const util = require('util');
// localhost:3000/query?id=kim
app.get('/query',function (request, response){
    let id = request.query.id
    response.send(`<h1>id - ${id}</h1>`);
});
// localhost:3000/rest/id/kim
app.get('/rest/id/:id',function (request, response){
    let id = request.params.id;
    response.send(`<h1>id - ${id}</h1>`);
});
// localhost:3000/rest2/kim
app.get('/rest2/:id',function (request, response){
    let id = request.params.id;
    response.send(`<h1>id - ${id}</h1>`);
});
app.get('*', (request, response)=>{
    response.status(404).send('Path not found');  // 메소드 채이닝
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000')
})