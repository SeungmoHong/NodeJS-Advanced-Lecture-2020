const template = require('./template');

module.exports.bbsUpdateForm = function (uname, result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>글 수정하기</h2>          
            </div>
            <form action="/bbs/update" method="post" >
            <input type="hidden"  name="bid" id="bid" value="${result.bid}">
            <div class="mb-3">
                <label for="title">제목</label>
                <input type="text" class="form-control" name="title" id="title" value="${result.title}">
            </div>
            <div class="form-group green-border-focus">
                <label for="content">내용</label>
                <textarea class="form-control" rows="10" name="content" id="content">${result.content}</textarea>
                <div class="col-5"></div>
                <br>
                <button type="reset" class="btn btn-sm btn-secondary float-right" onclick="location.href='/bbs/${result.bid}'">취소</button>
                <button type="submit" class="btn btn-sm btn-primary float-right">수정</button>
                
            </div>
            </form>
            <div class="col-3"></div>
        </div>
            </div>
        </div>
            
        ${template.footer()}
    `;
}
