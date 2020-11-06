const template = require('./template');

module.exports.userPicUpdateForm = function (uname, result) {
	return `
        ${template.header()}
        ${template.nav(uname)}
<div class="container" style="margin-top: 90px;">  
    <div class="row">
        <div class="col-12">
            <h3>회원사진 수정하기</h3>
            <hr>
        </div>
        <div class="col-3"></div>
        <div class="col-6">
        <form action="/user/updatePic" method="post" enctype="multipart/form-data">
        <table class="table table-borderless">
            <tr>
                <td><label for="photo">원래 사진</label></td>
                <td>
                    <img src="${result.photo}" style="width:150px">
                </td>
            </tr>
            <tr>
                <td><label for="photo">수정 할 사진</label></td>
                    <td>
                        <div class="custom-file mb-3">
                        <input type="file" class="custom-file-input" id="photo" name="photo">
                        <label class="custom-file-label" for="photo">업로드할 사진 파일 선택</label>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;">
                    <input class="btn btn-primary" type="submit" value="확인">
                    <input class="btn btn-secondary" type="reset" onclick="location.href='/'" value="취소">
                </td>
            </tr>
        </table>
        </form>
        </div>
        <div class="col-3"></div>
        </div>
    </div>
</div>
<script>
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
</script>
            
        ${template.footer()}
    `;
}