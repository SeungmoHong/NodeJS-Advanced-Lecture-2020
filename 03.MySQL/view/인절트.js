module.exports.insertForm = function() {
    return`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Singer Form</title>
    </head>
    <body>
        <h3>가수 입력</h3>
        <hr>
        <form action="/insert" method="post">
            <table>
                <tr>
                    <td><label for="NAME">가수 이름</label></td>
                    <td><input type="text" name="NAME" id="NAME"></td>
                </tr>
                <tr>
                    <td><label for="lyrics">데뷔일</label></td>
                    <td><input type="text" name="debut" id="debut"></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="제출"></td>
                </tr>
            </table>
        </form>
    </body>
    </html>
    `;
}