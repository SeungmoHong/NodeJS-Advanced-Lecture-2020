const express = require('express');
const { response } = require('express');
const app = express();
const util = require('util');
const { request } = require('http');
// localhost:3000/query?id=kim
app.get('/',function (request, response){
    let agent = request.header('User-Agent');
    if(agent.toLowerCase().toLowerCase().match(/chrome/)){
        response.send(`크롬 브라우저 입니다.`);
    }else{
        response.send(`크롬 브라우저가 아닙니다.`);
    }
});

app.get('*', (request, response)=>{
    response.status(404).send('Path not found');  // 메소드 채이닝
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000');
})