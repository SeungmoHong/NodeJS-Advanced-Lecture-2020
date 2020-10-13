const mysql = require('mysql')
const fs = require('fs')
let info = fs.readFileSync('./mysql.json','utf8');
let config = JSON.parse(info);
let connection = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
})
connection.connect();

let sql = `insert into song(title, lyrics) values('dynamite','I came toasasdasdas')`;
connection.query(sql, function(error, fields){
    if(error)
        console.log(error);
    }
);
connection.end();