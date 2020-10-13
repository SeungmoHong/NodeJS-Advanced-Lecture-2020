module.exports.mainForm = function(rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr>
                        <td>${row.NAME}</td>
                        <td>${row.debut}</td>
                        <td>
                        <a href="/update/${row.ggid}">수정</a> 
                        <a href="/delete/${row.ggid}">삭제</a>
                        </td>
                    </tr>`;
    }
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>가수 조회</title>
</head>
<body>
<div class="container-fluid" style="text-align : center">
    <h3>가수 조회</h3>
    <hr>
    <table class="table">
        <tr>
            <th>가수</th>
            <th>데뷔일</th>
            <th>액션<th>
        </tr>
        ${tableRow}
    </table>
</div>
</body>
</html>
    `;
}
