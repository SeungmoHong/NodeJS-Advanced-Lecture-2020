const express = require('express');
const bRouter = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dm = require('./db/dbmodule');
const FileStore = require('session-file-store')(session);

bRouter.get('/bbs', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/mainBbs');
        let html = view.bbsForm(rows);
        res.send(html); 
    });
});
bRouter.get('/bbs/:bid', (req, res) => {
    dm.getAllContent(rows => {
        const view = require('./view/bbsRead');
        let html = view.bbsReadForm(rows);
        res.send(html); 
    });
});
bRouter.get('/insert', (req, res) => {
    dm.getAllContent(rows => {
        const view = require('./view/bbsRead');
        let html = view.bbsReadForm(rows);
        res.send(html); 
    });
});
bRouter.post('/register', (req, res) => {
    let uid = req.body.uid;
    let title = req.body.title;
    let content = req.body.content;
    let uname = req.body.uname;
    let params = [uid,pwdHash,uname];
    dm.insertUid(params, ()=>{
        res.redirect('/main/bbs')
    })
   
});


module.exports = bRouter;