const template = require('./template');

module.exports.usersForm = function (uname,rows,pageNo, startPage, endPage, totalPage) {
    let tableRow = '';
    
    
    for (let row of rows) {
        
        if(String(row.tel)==='null'||String(row.tel)===''){
            row.tel = '등록되지 않음'
        }
        if(String(row.email)==='null'||String(row.email)===''){
            row.email = '등록되지 않음'
        }
        if(String(row.photo)==='null'){
            row.photo = '/upload/1.png'
        }
        tableRow += `<tr>
                        <td>${row.uid}</td>
                        <td>${row.uname}</td>
                        <td>
                        <img style="margin-left: 30px;" src="${row.photo}" height="150" width="150">
                        </td>
                        <td>${row.tel}</td>
                        <td>${row.email}</td>
                        <td>
                        <a href="/user/adminDel/${row.uid}">탈퇴하기</a> 
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
            <table class="table">
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>사진</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>액션</th>
                </tr>    
                </thead>    
                    ${tableRow}
            </table>

            <div class="row mb-5" ></div>
		${template.footer()}
    `;
}