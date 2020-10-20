const template = require('./template');

module.exports.bbsUpdateForm = function (uname, result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>회원정보 수정하기</h2>          
        </div>
            <form action="/user/update" method="post" >
            <input type="hidden"  name="uid" id="uid" value="${result.uid}">
            <div class="mb-3">
                <label for="uname">이름</label>
                <input type="text" class="form-control" name="uname" id="uname" value="${result.uname}">
            </div>
            <div class="mb-3">
                <label for="tel">전화번호</label>
                <input type="text" class="form-control" name="tel" id="tel" value="${result.tel}">
            </div>
            <div class="mb-3">
            <label for="uname">이름</label>
            <input type="text" class="form-control" name="uname" id="uname" value="${result.uname}">
            </div>
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