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
                        <img style="margin-left: 30px;" src="${row.photo}" width="150">
                        </td>
                        <td>${row.tel}</td>
                        <td>${row.email}</td>
                        <td>
                        <a href="/user/adminDel/${row.uid}">탈퇴하기</a> 
                        </a>
                        </td>
                    </tr>`;
    }
    let leftPage = (pageNo > 10) ? `/user/list/${Math.floor(pageNo/10) * 10}` : '#';
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
            pages += `<li class="page-item"><a class="page-link" href="/user/list/${page}">${page}</a></li>`;
    }
    let rightPage = (endPage < totalPage) ? `/user/list/${Math.ceil(pageNo/10)*10 + 1}` : '#';
    pages += `<li class="page-item">
                <a class="page-link" href="${rightPage}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;
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
            <ul class="pagination justify-content-center">
            ${pages}
            </ul>
            <div class="row mb-5" ></div>
		${template.footer()}
    `;
}