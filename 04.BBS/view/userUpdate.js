const template = require('./template');

module.exports.userUpdateForm = function (uname, result) {
    if(String(result.tel)==='null'){
        result.tel = ''
    }
    if(String(result.email)==='null'){
        result.email = ''
    }
    if(String(result.photo)==='null'){
        result.photo = '/upload/1.png'
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
<div class="container" style="margin-top: 90px;">  
    <div class="row">
        <div class="col-12">
            <h3>회원정보 수정하기</h3>
            <hr>
        </div>
        <div class="col-3"></div>
        <div class="col-6">
            <form action="/user/picUpdate" method="post" >
                <table class="table table-borderless">
                    <tr>
                        <td><label for="uname">이름</label></td>
                        <td><input type="text" name="uname" id="uname" value="${result.uname}"></td>
                    </tr>
                    <tr>
                        <td><label for="tel">전화번호</label></td>
                        <td><input type="text" name="tel" id="tel" value="${result.tel}"></td>
                    </tr>
                    <tr>
                        <td><label for="email">이메일</label></td>
                        <td><input type="text" name="email" id="email" value="${result.email}"></td>
                    </tr>
                    <tr>
                        <td><label for="pwd">패스워드</label></td>
                        <td><input type="password" name="pwd" id="pwd"></td>
                    </tr>
                    <tr>
                        <td><label for="pwd2">패스워드 확인</label></td>
                        <td><input type="password" name="pwd2" id="pwd2"></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <input class="btn btn-primary" type="submit" value="확인">
                            <input class="btn btn-secondary" type="reset" onclick="location.href='/user/list/1'" value="취소">
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