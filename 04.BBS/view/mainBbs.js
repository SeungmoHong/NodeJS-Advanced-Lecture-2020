const template = require('./template');
const dm = require('../db/dbmodule')
module.exports.bbsForm = function (uname,rows,pageNo, startPage, endPage, totalPage) {
    let tableRow = '';
    for (let row of rows) {
        let displayTime = dm.getDisplayTime(row.modTime);
        tableRow += `<tr onClick = " location.href='/bbs/${row.bid}'">
                        <td>${row.bid}</td>
                        <td>${row.title}(${row.replyCount})</td>
                        <td>${row.uname}</td>
                        <td>${displayTime}</td>
                        <td>${row.viewCount}</td>
                    </tr>`;
    }
    let leftPage = (pageNo > 10) ? `/bbs/list/${Math.floor(pageNo/10) * 10}` : '#';
    let pages = `<li class="page-item">
                    <a class="page-link active" href="${leftPage}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page = startPage; page <= endPage; page++) {
        if (page === pageNo)
            pages += `<li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>`;
        else
            pages += `<li class="page-item"><a class="page-link" href="/bbs/list/${page}">${page}</a></li>`;
    }
    let rightPage = (endPage < totalPage) ? `/bbs/list/${Math.ceil(pageNo/10)*10 + 1}` : '#';
    pages += `<li class="page-item">
                <a class="page-link" href="${rightPage}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>게시판</h2>     
            <br>
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>    
                </thead>    
                    ${tableRow}
            </table>
            <ul class="pagination justify-content-center">
            ${pages}
            </ul>
		${template.footer()}
    `;
}
