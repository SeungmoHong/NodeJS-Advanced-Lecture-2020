const mysql = require('mysql')
const fs = require('fs')

let info = fs.readFileSync('./mysql.json','utf8');
let connInfo = JSON.parse(info);
let connection = mysql.createConnection({
    host:   connInfo.host,
    user:   connInfo.user,
    password:   connInfo.password,
    database:   connInfo.database,
    port:   connInfo.port
})
connection.connect();
let sql = `SELECT l.District, l.population, r.Language
FROM city AS l
INNER join countrylanguage AS r
ON l.CountryCode = r.countrycode
WHERE r.IsOfficial ='t'
ORDER BY l.Population desc
limit 10;
`


connection.query(sql, function(error, rows, fields){
    if(error)
        console.log(error);
    for(let row of rows){
        console.log(row.District,row.population,row.Language)
    }
});
connection.end();