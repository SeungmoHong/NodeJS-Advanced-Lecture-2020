const template = require('./template');

module.exports.bbsForm = function (uname,rows) {
    let tableRow = '';
    for (let row of rows) {

        tableRow += `<tr onClick = " location.href='/bbs/${row.bid}'">
                        <td>${row.bid}</td>
                        <td>${row.title}(${row.replyCount})</td>
                        <td>${row.uid}</td>
                        <td>${row.modTime}</td>
                        <td>${row.viewCount}</td>
                        <td>
                        </td></a>
                    </tr>`;
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>게시판</h2>          
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
		${template.footer()}
    `;
}
