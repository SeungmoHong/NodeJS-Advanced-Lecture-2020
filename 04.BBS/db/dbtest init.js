const fs = require('fs');
const mysql = require('mysql');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);

function getConnection() {
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
}

let sql = `
    create table if not exists users(
        uid varchar(20) not null primary key,
        pwd char(44) not null,
        uname varchar(20) not null,
        tel varchar(20),
        email varchar(40),
        regDate datetime default current_timestamp,
        isDeleted int default 0
    );
`;
let bbssql = `
create table if not exists bbs(
    bid int not null primary KEY AUTO_INCREMENT,
    uid varchar(20) not null,
    FOREIGN KEY (uid) REFERENCES users(uid),
    title VARCHAR(100) not null,
    content VARCHAR(1000),
    modTime DATETIME DEFAULT current_timestamp,
    viewCount INT DEFAULT 0,
    isDeleted int default 0
    replyCount int default 0
)AUTO_INCREMENT=1001;
`;
let replysql= `
    create table if not exists reply(
        rid int not null primary KEY AUTO_INCREMENT,
        bid INT NOT NULL,
        FOREIGN KEY (bid) REFERENCES bbs(bid),
        uid varchar(20) not null,
        FOREIGN KEY (uid) REFERENCES users(uid),
        content VARCHAR(100),
        regTime DATETIME DEFAULT current_timestamp,
        isMine int default 0
);
`
let conn = getConnection();
conn.query(sql, 100, function(error, rows, fields) {
    if (error)
        console.log(error);
    console.log(rows[0]);
});
conn.end();


/* let sql = `delete from song where sid=?;`;
let conn = getConnection();
conn.query(sql, 125, function(error, fields) {
    if (error)
        console.log(error);
});
conn.end(); */