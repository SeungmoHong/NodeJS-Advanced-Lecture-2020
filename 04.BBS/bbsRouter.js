const express = require('express');
const bRouter = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dm = require('./db/dbmodule');
const FileStore = require('session-file-store')(session);
const view = require('./view/alertMsg');

bRouter.get('/list/:page',dm.isLoggedIn, (req, res) => {
    let page = parseInt(req.params.page);
    req.session.currentPage = page;
    let offset = (page - 1) * 10;
    dm.getBbsTotalCount(result => {
        let totalPage = Math.ceil(result.count / 10);
        let startPage = Math.floor((page-1)/10)*10 + 1;
        let endPage = Math.ceil(page/10)*10;
        endPage = (endPage > totalPage) ? totalPage : endPage;
        dm.getAllLists(offset, rows=>{
            const view = require('./view/mainBbs');
            let html = view.bbsForm(req.session.uname,rows, page, startPage, endPage, totalPage);
            res.send(html); 
        });
    });
});
bRouter.get('/:bid',dm.isLoggedIn, (req, res) => {
    let bid = parseInt(req.params.bid);
    dm.getContent(bid, result => {
        dm.insertViewCount(bid,()=>{
            dm.getReply(bid, replies=>{
                const view = require('./view/bbsRead');
                let html = view.bbsReadForm(req.session.uname,result, replies);
                res.send(html);  
            });
        });
    });
});
bRouter.get('/new/insert',dm.isLoggedIn, (req, res) => {
    const view = require('./view/insertBbs');
    let html = view.insertBbs(req.session.uname);
    res.send(html);
});
bRouter.post('/new/insert', (req, res) => {
    uid = req.session.uid
    let title = req.body.title;
    let content = req.body.content;
    let params = [uid, title, content];
    dm.insertBbs(params, ()=>{
        res.redirect('/bbs/list/1');
    console.log(params);
    });
});
bRouter.post('/reply',dm.isLoggedIn, (req, res) => {
    let bid = parseInt(req.body.bid);
    let uid = req.session.uid;
    let rep = req.body.rep;
    let isMine = (uid === req.body.uid) ? 1 : 0;
    let params = [bid,uid,rep,isMine];
    dm.insertReply(params, ()=>{
        dm.increaseReplyCount(bid, () => {
            res.redirect(`/bbs/${bid}`);
        });
    console.log(params);
    });
});
bRouter.get('/delete/:bid/:uid',dm.isLoggedIn,(req,res)=>{
    let bid = req.params.bid;
    let uid = req.params.uid;
    if(uid === req.session.uid){
        dm.deleteBbs(bid, ()=>{
            res.redirect('/bbs')
        });
    }else{
        let html= view.alertMsg('삭제 권한이 없습니다.',(`/bbs/${bid}`)); 
        res.send(html);
        console.log(uid)
    }
});
bRouter.get('/update/:bid/:uid',dm.isLoggedIn,(req,res)=>{
    let bid = req.params.bid;
    if(req.params.uid===req.session.uid){
        dm.getBbs(bid, (result) =>{
            const view = require('./view/bbsUpdate');
            let html = view.bbsUpdateForm(req.session.uname,result);
            res.send(html); 
        });
    }else{
        let html= view.alertMsg('수정 권한이 없습니다.',(`/bbs/${bid}`)); 
        res.send(html);
    }
});
bRouter.post('/update',dm.isLoggedIn, (req,res)=>{
    let bid = parseInt(req.body.bid);
    let title = req.body.title;
    let content = req.body.content;
    let params = [title,content,bid];

    dm.updateBbs(params, ()=>{
        res.redirect(`/bbs/${bid}`)
    });
})
bRouter.post('/search',dm.isLoggedIn,(req,res)=>{
    let searched ='%'+req.body.searched+'%';
    dm.searchTitle(searched,rows => {
        const view = require('./view/searchBbs');
        let html = view.searchForm(req.session.uname,rows);
        res.send(html);
    })
})

module.exports = bRouter;