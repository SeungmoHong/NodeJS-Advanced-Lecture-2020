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
    if(uid.length>3){
        if(pwd.length>3){
            if(uname.length>1){
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

            }else{
                let html= view.alertMsg('이름이 너무 짧습니다.(2글자 이상)',(`/user/register`));
                    res.send(html);
            }
        }else{
            let html= view.alertMsg('패스워드가 너무 짧습니다.(4글자 이상)',(`/user/register`));
            res.send(html); 
        }
    }else{
        let html= view.alertMsg('아이디가 너무 짧습니다.(4글자 이상)',(`/user/register`));
            res.send(html);
    }
});
uRouter.get('/list/:page',dm.isLoggedIn, (req, res) => {
    if(req.session.uid==='admin'){
        let page = parseInt(req.params.page);
        req.session.currentPage = page;
        let offset = (page - 1) * 10;
        dm.getUserTotalCount(result=>{
            let totalPage = Math.ceil(result.count / 10);
            let startPage = Math.floor((page-1)/10)*10 + 1;
            let endPage = Math.ceil(page/10)*10;
            endPage = (endPage > totalPage) ? totalPage : endPage;
            dm.getAllusers(offset,rows => {
                const view = require('./view/usersBbs');
                let html = view.usersForm(req.session.uname, rows, page, startPage, endPage, totalPage);
                res.send(html); 
            });
        })
    }else{
        let uid = req.session.uid
        dm.getUserInfo(uid, result => {
            const view = require('./view/userImfo');
            let html = view.usersImfoForm(req.session.uname,result);
            res.send(html); 
        });
    }
});
uRouter.get('/admindelete/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.params.uid;
    dm.getUserInfo(uid, ()=>{
        dm.deleteUser(uid,()=>{
            res.redirect('/user/list/1')
        })
    })
});
uRouter.get('/update/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.session.uid
    dm.getUserInfo(uid, (result)=>{
        const view = require('./view/userUpdate');
        let html = view.userUpdateForm(req.session.uname,result);
        res.send(html);
    })
});
uRouter.post('/update',dm.isLoggedIn,(req,res)=>{
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
            let html= view.alertMsg('회원정보 수정이 완료되었습니다.',('/user/list/1'));
        res.send(html);
        })
    }else{             //패스워드와 패스워드 확인이 다른경우
        let html= view.alertMsg('패스워드가 일치하지 않습니다.',(`/user/update/${uid}`));
        res.send(html);
    } 
})
uRouter.get('/delete/:uid',dm.isLoggedIn,(req,res)=>{
    let uid = req.session.uid
    dm.getUserInfo(uid, ()=>{
        dm.deleteUser(uid,()=>{
            let html= view.alertMsg('아이디가 삭제되었습니다. 이용해주셔서 감사합니다.',('/login')); 
            res.send(html);
        })
    })
});


module.exports = uRouter;