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
            port:   config.port
        });
        conn.connect(function(error) {
            if (error) 
                console.log('mysql connection error :' + err);
        });
        return conn;
    },
    getAllLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT uid, uname, DATE_FORMAT(regDate, '%Y-%m-%d %T') AS regDate  
                    from users WHERE isdeleted =0
                    ORDER BY regDate LIMIT 10;`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo:    function(uid, callback){
        let conn = this.getConnection();
        let sql = `select * from users where uid like ?;`
        conn.query(sql,uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   //주의할 것
        });
        conn.end();
    },
    deleteUser:     function(uid, callback){
        let conn = this.getConnection();
        let sql = `update users set isDeleted=1 where uid like ?;`      // isDeleted를 수정하는 방법으로 삭제
        conn.query(sql,uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(); // update,delete,create필요 x
        });
        conn.end();
    },
    updateUser:     function(params, callback){
        let conn = this.getConnection();
        let sql = `update users set pwd=? where uid like ?;`
        conn.query(sql,params, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(); // update,delete,create필요 x
        });
        conn.end();
    }
}