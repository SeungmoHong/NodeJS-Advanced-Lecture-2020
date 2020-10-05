var http = require('http')
var fs = require('fs')
var ejs = require('ejs')

http.createServer(function(request, response){
    fs.readFile('01.ejsPage.ejs', 'utf8', function(error, data){
        response.writeHead(200,{'Content-Type' : 'text/html'});
        response.end(ejs.render(data));
    });
}).listen(3000, function(){
    console.log('Server Running at http://127.0.0.1:3000')
})