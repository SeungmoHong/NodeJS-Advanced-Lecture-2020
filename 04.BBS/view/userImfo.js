const template = require('./template');

module.exports.usersImfoForm = function (uname,result) {
    if(String(result.tel)==='null'){
        result.tel = '등록되지 않음'
    }
    if(String(result.email)==='null'){
        result.email = '등록되지 않음'
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>${result.uname}님의 정보</h2>          
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>Tel</th>
                    <th>Email</th>
                    <th>액션</th>
                </tr>    
                </thead>    
                    <td>${result.uid}</td>
                    <td>${result.uname}</td>
                    <td>${result.tel}</td>
                    <td>${result.email}</td>
                    <td>
                    <a href="/users/update/${result.uid}">수정하기</a>
                    <a href="/users/delete/${result.uid}">삭제하기</a>
                    </td>
            </table>
		${template.footer()}
    `;
}
