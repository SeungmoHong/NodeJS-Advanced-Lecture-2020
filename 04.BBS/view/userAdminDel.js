const template = require('./template');

module.exports.userAdminDeleteForm = function (uname,result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>사용자 삭제</h2>
            <div class="card">
            <div class="card-body">
              <h4 class="card-title">${result.uname} 계정을 삭제하시겠습니까?</h4>
              <a href=/user/admindelete/${result.uid}" class="card-link">삭제하기</a>
              <a href="/user/list/1" class="card-link">취소</a>
            </div>
            </div> 
            <div class="row mb-5" ></div>
		${template.footer()}
    `;
}
