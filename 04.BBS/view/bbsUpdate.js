const template = require('./template');

module.exports.bbsUpdateForm = function (uname, result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>글읽기</h2>          
            </div>
            <form action="/bbs/update" method="post" >
            <input type="hidden"  name="bid" id="bid" value="${result.bid}">
            <div class="mb-3">
                <label for="title">제목</label>
                <input type="text" class="form-control" name="title" id="title" value="${result.title}">
            </div>
            <div class="mb-6">
                <label for="content">내용</label>
                <input type="text" class="form-control" name="content" id="content" value="${result.content}">
                <div class="col-5"></div>
                <button type="submit" class="btn btn-sm btn-primary float-right">수정하기</button>
            </div>
            </form>
            <div class="col-3"></div>
        </div>
            </div>
        </div>
            
        ${template.footer()}
    `;
}
