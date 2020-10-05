const express = require('express');
const app = express();
const util = require('util');
app.use(function (request, response){
    let html =`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Express</title>
            </head>
            <body>
                <h1>Welcome to Express World</h1>
            </body>
            </html>
    `;
    response.send(html)
    
});
app.listen(3000, function(){
    util.log('Server Running at http://127.0.0.1:3000')
})