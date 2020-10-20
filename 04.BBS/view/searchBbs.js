const template = require('./template');

module.exports.searchForm = function (uname,data) {
    let tableRow = '';
    for (let row of data) {
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
            <h2>검색결과</h2>          
            <table class="table table-striped">
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
