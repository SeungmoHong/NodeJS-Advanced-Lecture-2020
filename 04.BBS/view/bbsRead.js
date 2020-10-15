const template = require('./template');

module.exports.bbsReadForm = function (rows) {
    let tableRow = '';
    for (let row of rows) {
        tableRow += `<tr onClick = " location.href='main/bbs/${row.bid}'">
                        <td>${row.bid}</td>
                        <td>${row.title}</td>
                        <td>${row.uid}</td>

                        <td>
                        </td></a>
                    </tr>
                    </table>
                    <p>${row.content}</p>
                    <form action="/action_page.php">
                    <div class="col-10">
                        <input type="text" class="form-control" id="reply" placeholder="댓글을 입력하세요." name="reply">
                    </div>
                    <div class="col-2">
                        <button type="submit" class="btn btn-primary mt-3">댓글 남기기</button>
                    </div>
                    </form>
                    </div>
                    `;
    }
	return `
		${template.header()}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>글읽기</h2>          
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                </tr>    
                </thead>    
                    ${tableRow}
            
            
        ${template.footer()}
    `;
}
