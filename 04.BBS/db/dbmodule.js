const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');
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
    generateHash:   function(something) {
        // SHA: Secure Hash Algorithm
        let shasum = crypto.createHash('sha256');   // sha256, sha512
        shasum.update(something);
        return shasum.digest('base64');  // hex, base64
    },
    isLoggedIn:     function(req, res, next) {
        if (!req.session.uid) {    
            res.redirect('/login');
        } else {
            next();
        }
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
    getAllLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT  r.bid AS bid, l.uid AS uid, r.title AS title, r.modTime, r.viewCount,l.uname AS uname
        FROM users AS l 
        INNER JOIN bbs AS r
        ON l.uid = r.uid
        WHERE  r.isDeleted = 0`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertUid:     function(params,callback){
        let sql = `INSERT INTO users(uid,pwd,uname) values(?,?,?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getAllContent:    function(callback) {
        let conn = this.getConnection();
        let sql = `select * from bbs
        WHERE isDeleted = 0`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    insertBbs:     function(params,callback){
        let sql = `INSERT INTO bbs(uid,pwd,uname) values(?,?,?);`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    
}