const template = require('./template');

module.exports.insertBbs = function () {
	return `
		${template.header()}
<div class="container" style="margin-top: 90px;">  
    <div class="row">
        <div class="col-12">
            <h3>글 쓰기</h3>
            <hr>
        </div>
        <div class="col-3"></div>
        <div class="col-6">
            <form action="/user/register" method="post">
                <table class="table table-borderless">
                    <tr>
                        <td><label for="title">제목</label></td>
                        <td><input type="text" name="title" id="title"></td>
                    </tr>
                    <tr>
                        <td><label for="content">글 내용</label></td>
                        <td><input type="text" name="content" id="content"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <input class="btn btn-primary" type="submit" value="확인">
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
</div>
		${template.footer()}
    `;
}
