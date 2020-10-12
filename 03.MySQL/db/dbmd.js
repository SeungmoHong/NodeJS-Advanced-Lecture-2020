const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);

module.exports = {
    getConnection: function() {
        let conn = mysql.createConnection({
            host:   config.host,
            user:   config.user,
            password:   config.password,
            database:   config.database,
            port:   config.port,
            dateStrings : 'date'
        });
        conn.connect(function(error) {
            if (error) 
                console.log('mysql connection error :' + err);
        });
        return conn;
    },
    getAllLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT * from girl_group ORDER BY ggid DESC LIMIT 5`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertSinger:     function(params,callback){
        let sql = `INSERT INTO girl_group(NAME,debut) values(?, ?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteSinger:     function(ggid,callback){
        let sql = `delete from girl_group where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getSinger:    function(ggid, callback){
        let sql=`select * from girl_group where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, ggid, function(error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);      //주의 array
        });
        conn.end();
    },
    updateSinger:     function(params,callback){
        let sql = `update girl_group set NAME=?, debut=? where ggid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    }
}