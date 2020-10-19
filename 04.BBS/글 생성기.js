const mysql = require('mysql')
const fs = require('fs')
let info = fs.readFileSync('./mysql.json','utf8');
let config = JSON.parse(info);
let conn = mysql.createConnection({
    host:   config.host,
    user:   config.user,
    password:   config.password,
    database:   config.database,
    port:   config.port
})


let sql = `insert into bbs(uid, title, content) values(?,?,?)`;
let params = ['admin','테스트', '내용내용내용내용내용내용']
conn.query(sql,params, function(error, fields){
    if(error)
        console.log(error);
    }
);
conn.end();

