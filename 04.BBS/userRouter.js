const express = require('express');
const view = require('./view/alertMsg');
const dm = require('./db/dbmodule');

const uRouter = express.Router();


uRouter.get('/register', (req, res) => {
    const view = require('./view/userRegister');
    let html = view.register();
    res.send(html);
});

uRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let tel = req.body.tel;
    let email = req.body.email;
    let pwd = req.body.pwd;
    let pwd2 = req.body.pwd2;
    let uname = req.body.uname;
    if (pwd === pwd2){      // 패스워드와 패스워드 확인이 일치
        let pwdHash = dm.generateHash(pwd);
        let params = [uid,tel,email,pwdHash,uname];
        dm.insertUid(params, ()=>{
            let html= view.alertMsg('회원가입이 완료되었습니다. 로그인 하세요.',('/login'));
        res.send(html);
        })
    }else{             //패스워드와 패스워드 확인이 다른경우
        let html= view.alertMsg('패스워드가 일치하지 않습니다.',(`/user/register`));
        res.send(html);
    }
});
uRouter.get('/update/:bid',dm.isLoggedIn,(req,res)=>{

})

module.exports = uRouter;