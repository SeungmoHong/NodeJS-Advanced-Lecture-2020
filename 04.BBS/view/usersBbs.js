const template = require('./template');

module.exports.usersForm = function (uname,rows) {
    let tableRow = '';
    for (let row of rows) {
        if(String(row.tel)==='null'){
            row.tel = '등록되지 않음'
        }
        if(String(row.email)==='null'){
            row.email = '등록되지 않음'
        }
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.tel}</td>
                        <td>${row.email}</td>
                        <td>
                        <a href="/user/update/${row.uid}">아이디 수정</a> 
                        </a>
                        </td>
                    </tr>`;
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>사용자 리스트</h2>          
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>Tel</th>
                    <th>Email</th>
                    <th>기타</th>
                </tr>    
                </thead>    
                    ${tableRow}
            </table>
		${template.footer()}
    `;
}
