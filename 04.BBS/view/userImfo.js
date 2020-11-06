const template = require('./template');

module.exports.usersImfoForm = function (uname,result) {
    if(String(result.tel)===''||String(result.tel)==='null'){
        result.tel = '등록되지 않음'
    }
    if(String(result.email)===''||String(result.email)==='null'){
        result.email = '등록되지 않음'
    }
    if(String(result.photo)==='null'){
        result.photo = '/upload/1.png'
    }
    
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>${result.uname}님의 정보</h2>          
            <table class="table">
                <tr>
                    <td>사용자 아이디:</td>
                    <td>${result.uid}</td>
                    <td rowspan="6">
                        <img src="${result.photo}" height="300" width="200">
                    </td>
                </tr>
                <tr>
                    <td>사용자 이름:</td>
                    <td>${result.uname}</td>
                </tr>
                <tr>
                    <td>사용자 연락처:</td>
                    <td>${result.tel}</td>
                </tr>
                <tr>
                    <td>사용자 이메일:</td>
                    <td>${result.email}</td>
                </tr>
                <tr>
                    <td>사용자 정보수정:</td>
                    <td>
                    <a href="/user/update/${result.uid}">수정하기</a>
                    </td>
                </tr>
                <tr>
                    <td>계정 탈퇴하기</td>
                    <td>
                    <a href="/user/userDelete/${result.uid}">탈퇴하기</a>
                    </td>
                </tr>
                <tr>
                    <td>사용자 정보수정:</td>
                    <td>
                        <a href="/user/picUpdate/${result.uid}">사진수정하기</a>
                    </td>
                </tr>
            </table>
		${template.footer()}
    `;
}