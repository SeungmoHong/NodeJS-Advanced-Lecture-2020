const express = require('express');
const { response } = require('express');
const app = express();
const util = require('util');

app.use(express.static(__dirname+'/public')); // 경로 고정

// localhost:3000/query?id=kim
app.get('/',function (request, response){
let html =
`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express</title>
</head>
<body>
    <h1>Static Image</h1>
    <hr>
    <img src="/cat.jpg" alt="고양이"><br>
    <img src="img/dog.jpg" alt="개">
</body>
</html>
`;
response.send(html);
});

app.get('*', (request, response)=>{
    response.status(404).send('Path not found');  // 메소드 채이닝
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000');
})