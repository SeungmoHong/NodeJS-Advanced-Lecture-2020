const fs = require('fs');
const mysql = require('mysql');
const crypto = require('crypto');
const moment = require('moment');
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
    getAllLists:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT  r.bid AS bid, l.uid AS uid, r.title AS title, r.modTime AS modTime, r.viewCount as viewCount,l.uname AS uname,r.replyCount AS replyCount
        FROM users AS l 
        INNER JOIN bbs AS r
        ON l.uid = r.uid
        WHERE  r.isDeleted = 0
        GROUP BY bid
        ORDER BY modTime desc
	    limit 10`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getUserInfo:    function(uid, callback){
        let conn = this.getConnection();
        let sql = `select * from users where uid like ? and isDeleted=0;`
        conn.query(sql,uid, (error, results, fields) => {
            if (error)
                console.log(error);
            callback(results[0]);   //주의할 것
        });
        conn.end();
    },
    
    insertUid:     function(params,callback){
        let conn = this.getConnection();
        let sql = `INSERT INTO users(uid,tel,email,pwd,uname) values(?,?,?,?,?);`;
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getContent:    function(bid,callback) {
        let conn = this.getConnection();
        let sql = `SELECT  r.bid AS bid, l.uid AS uid, r.content AS content,r.title AS title, r.modTime, r.viewCount,l.uname AS uname,r.replyCount as replyCount
        FROM users AS l 
        INNER JOIN bbs AS r
        ON l.uid = r.uid
        WHERE  r.isDeleted = 0  AND r.bid =?`;
        conn.query(sql, bid, function(error,rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);
        });
        conn.end();
    },
    getReply:    function(bid,callback) {
        let conn = this.getConnection();
        let sql = `SELECT l.rid, l.bid, l.uid, r.uname, l.content as rep, l.isMine as isMine,
        l.regTime as regTime
        FROM reply AS l
        JOIN users AS r
        ON r.uid = l.uid
        WHERE r.isDeleted = 0 and l.bid=?
        ORDER BY l.regTime;`;
        conn.query(sql, bid, function(error,rows, fields) {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },insertBbs:     function(params,callback){
        let conn = this.getConnection();
        let sql = `insert into bbs(uid, title, content) values(?,?,?);`;
        
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },insertReply:     function(params,callback){
        let conn = this.getConnection();
        let sql = `insert into reply(bid, uid, content,isMine) values(?,?,?,?)`;
        
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    getAllusers:    function(callback) {
        let conn = this.getConnection();
        let sql = `SELECT * FROM users where isDeleted =0`;
        conn.query(sql, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    getBbs:    function(bid, callback){
        let sql=`select * from bbs where bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, bid, function(error, rows, fields) {
            if (error)
                console.log(error);
            callback(rows[0]);      //주의 array
        });
        conn.end();
    },
    insertViewCount:    function(bid, callback){
        let sql=`update bbs set viewCount=viewCount+1 where bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, bid, function(error, fields) {
            if (error)
                console.log(error);
            callback(); 
        });
        conn.end();
    },
    increaseReplyCount:  function(bid, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set replyCount=replyCount+1 where bid=?;`;
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteBbs:     function(bid,callback){
        let sql = `update bbs set isDeleted=1 where bid like ?;`;
        let conn = this.getConnection();
        conn.query(sql, bid, function(error, fields) {
            if (error)
            console.log(error);
            callback();
        });
        conn.end();
    },
    
    updateBbs:     function(params,callback){
        let sql = `update bbs set title=?, content=?,modTime =now() where bid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    searchTitle:    function(searched,callback) {
        let conn = this.getConnection();
        let sql = `SELECT  r.bid AS bid, l.uid AS uid, r.title AS title, r.modTime AS modTime, r.viewCount as viewCount,l.uname AS uname,r.replyCount AS replyCount
        FROM users AS l 
        INNER JOIN bbs AS r
        ON l.uid = r.uid
        WHERE  r.isDeleted = 0 and r.title LIKE ?
        ORDER BY modTime desc
	    limit 10
	   `;
        conn.query(sql, searched, (error, rows, fields) => {
            if (error)
                console.log(error);
            callback(rows);
        });
        conn.end();
    },
    updateUser:     function(params,callback){
        let sql = `update users set uname=?, tel=?, email=?, pwd=? where uid=?;`;
        let conn = this.getConnection();
        conn.query(sql, params, function(error, fields) {
            if (error)
                console.log(error);
            callback();
        });
        conn.end();
    },
    deleteUser:     function(uid,callback){
        let sql = `update users set isDeleted=1 where uid like ?;`;
        let conn = this.getConnection();
        conn.query(sql, uid, function(error, fields) {
            if (error)
            console.log(error);
            callback();
        });
        conn.end();
    },
    getDisplayTime:     function(dt) {
        let today = moment().format('YYYY-MM-DD');
        let dbtime = moment(dt).format('YYYY-MM-DD HH:mm:ss');
        return (dbtime.indexOf(today) == 0) ?
            dbtime.substring(11) : dbtime.substring(0,10);
    }
    
}