const template = require('./template');

module.exports.bbsDeleteForm = function (uname,result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>게시글 삭제</h2>
            <div class="card">
            <div class="card-body">
              <h4 class="card-title">글을 삭제하시겠습니까?</h4>
              <a href=/bbs/delete/${result.bid}/${result.uid} class="card-link">삭제하기</a>
              <a href="/bbs/${result.bid}" class="card-link">취소</a>
            </div>
            </div> 
            <div class="row mb-5" ></div>
		${template.footer()}
    `;
}
