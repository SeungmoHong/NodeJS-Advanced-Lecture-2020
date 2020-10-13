module.exports.updateForm = function(result) {
    return`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <title>Singer Form</title>
    </head>
    <body>
    <div class="container-fluid">
        <h3>가수 수정</h3>
        <hr>
        <form action="/update" method="post">
            <input type="hidden" name="ggid" value="${result.ggid}">
            <table>
                <tr>
                    <td><label for="title">가수 입력</label></td>
                    <td><input type="text" name="NAME" id="NAME" value="${result.NAME}"></td>
                </tr>
                <tr>
                    <td><label for="lyrics">데뷔일</label></td>
                    <td><input type="text" name="debut" id="debut" value="${result.debut}"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="수정"></td>
                </tr>
            </table>
        </form>
    </div>
    </body>
    </html>
    `;
}