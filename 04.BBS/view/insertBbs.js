const template = require('./template');

module.exports.insertBbs = function (uname,rows) {
	return `
        ${template.header()}
        ${template.nav(uname)}
<div class="container" style="margin-top: 90px;">  
    <div class="container" role="main">
    <h2>글 쓰기</h2>
    <hr>
        </div>
        <form name="form" id="form" role="form" method="post" action="/insert">
        <div class="mb-3">
            <label for="title">제목</label>
            <input type="text" class="form-control" name="title" id="title" placeholder="제목을 입력해 주세요">
        </div>
        <div class="mb-6">
            <label for="content">내용</label>
            <textarea class="form-control" rows="5" name="content" id="content" placeholder="내용을 입력해 주세요" ></textarea>
            <div class="col-5"></div>
            <button type="submit" class="btn btn-sm btn-primary float-right">저장</button>
        </div>
        </form>
        <div class="col-3"></div>
    </div>
</div>
		${template.footer()}
    `;
}
