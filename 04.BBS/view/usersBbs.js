const template = require('./template');

module.exports.usersForm = function (uname,rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>${row.tel}</td>
                        <td>${row.email}</td>
                        <td>
                        </td></a>
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
                </tr>    
                </thead>    
                    ${tableRow}
            </table>
		${template.footer()}
    `;
}
