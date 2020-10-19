const template = require('./template');

module.exports.bbsReadForm = function (uname, result, replies) {
    let tableRow = '';
    for (let reply of replies) {
        tableRow += `
        <tr>
        <td>${reply.uname}</td>
        <td>${reply.rep}</td>
        </tr>`;
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>글읽기</h2>
            <a href="/bbs/update/${result.bid}/${result.uid}">수정</a> 
            <a href="/bbs/delete/${result.bid}/${result.uid}">삭제</a>          
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                </tr>    
                </thead>    
                <tr>
                <td>${result.bid}</td>
                <td>${result.title}</td>
                <td>${result.uid}</td>

                <td>
                </td>
                </tr>
            </table>
            <p>${result.content}</p>
            <form action="/bbs/reply" method="post" >
            <div class="col-12">
                <input type="hidden" name="bid" value="${result.bid}">
                <input type="hidden" name="uid" value="${result.uid}">
                <input type="text" class="form-control" id="rep" placeholder="댓글을 입력하세요." name="rep">
            </div>
            <div class="col-2">
                <button type="submit" class="btn btn-primary mt-3">댓글 남기기</button>
            </div>
            </form>
            <table class="table table-striped"> 
            ${tableRow}
            </table>
            </div>
        </div>
            
        ${template.footer()}
    `;
}
