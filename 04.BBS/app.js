const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uRouter = require('./userRouter');
const bRouter = require('./bbsRouter');
const view = require('./view/alertMsg');
const dm = require('./db/dbmodule');
const e = require('express');

const app = express();
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cookieParser('1q2w3e4r5t6y'));
app.use(session({
    secret: '1q2w3e4r5t6y',     // keyboard cat
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})
}));
app.use('/user', uRouter);
app.use('/bbs', bRouter);

app.get('/',(req, res) => {
    res.redirect('/login')
});
app.get('/login',(req, res) => {
    const view = require('./view/index');
    let html = view.loginForm();
    res.send(html);
});
app.post('/login',(req, res)=>{
    let uid = req.body.uid;
    let pwd = req.body.pwd;
    let pwdHash = dm.generateHash(pwd);
    dm.getUserInfo(uid, result=>{
        if (result=== undefined){
            const view = require('./view/alertMsg');
            let html= view.alertMsg(`Login 실패 : ${uid}이/가 없습니다`,'/login')
            res.send(html)
        }else{ 
            if(result.pwd === pwdHash){
                req.session.uid = uid;
                req.session.uname = result.uname;
                console.log('Login 성공')
                req.session.save(function(){
                    res.redirect('/bbs');
                });
            }else{
                const view = require('./view/alertMsg');
                let html= view.alertMsg('Login 실패: 패스워드가 다릅니다',('/login'))
                res.send(html)
            }
        }
    });
});



app.get('/insert',dm.isLoggedIn, (req, res) => {
    const view = require('./view/insertBbs');
    let html = view.insertBbs(req.session.uname);
    res.send(html);
});
app.post('/insert', (req, res) => {
    uid = req.session.uid
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.insertBbs(params, ()=>{
        res.redirect('/bbs');
    console.log(params);
    });
});
app.get('/users',dm.isLoggedIn, (req, res) => {
    if(req.session.uid==='admin'){
        dm.getAllusers(rows => {
            const view = require('./view/usersBbs');
            let html = view.usersForm(req.session.uname,rows);
            res.send(html); 
        });
    }else{
        let uid = req.session.uid
        dm.getUserInfo(uid, result => {
            const view = require('./view/userImfo');
            let html = view.usersImfoForm(req.session.uname,result);
            res.send(html); 
        });
    }
});
app.get('/users/admindelete/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.params.uid;
    dm.getUserInfo(uid, ()=>{
        dm.deleteUser(uid,()=>{
            res.redirect('/users')
        })
    })
});
app.get('/users/update/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.session.uid
    dm.getUserInfo(uid, (result)=>{
        const view = require('./view/userUpdate');
        let html = view.userUpdateForm(req.session.uname,result);
        res.send(html);
    })
});
app.post('/users/update',dm.isLoggedIn,(req,res)=>{
    let uid = req.session.uid;
    let uname = req.body.uname;
    let tel = req.body.tel;
    let email = req.body.email
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    if (pwd === pwd2){      // 패스워드와 패스워드 확인이 일치
        let pwdHash = dm.generateHash(pwd);
        let params = [uname,tel,email,pwdHash,uid];
        dm.updateUser(params, ()=>{
            let html= view.alertMsg('회원정보 수정이 완료되었습니다.',('/bbs'));
        res.send(html);
        })
    }else{             //패스워드와 패스워드 확인이 다른경우
        let html= view.alertMsg('패스워드가 일치하지 않습니다.',(`/users/update/${uid}`));
        res.send(html);
    } 
})
app.get('/users/delete/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.session.uid
    dm.getUserInfo(uid, ()=>{
        dm.deleteUser(uid,()=>{
            let html= view.alertMsg('아이디가 삭제되었습니다. 이용해주셔서 감사합니다.',('/login')); 
            res.send(html);
        })
    })
});



app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});




app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});