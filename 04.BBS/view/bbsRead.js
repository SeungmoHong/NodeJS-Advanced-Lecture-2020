const template = require('./template');

module.exports.bbsReadForm = function (uname, result, replies) {
    let tableRow = '';
    for (let reply of replies) {
        if(reply.isMine === 1){
            tableRow += `
            <div class="row mt-3" >
            <div class="col-8"></div>
            <div class="card bg-info text-white col-4">
                <div class="card-body">
                ${reply.uname}
                &nbsp; &nbsp;
                ${reply.regTime}
                <br>
                ${reply.rep}
                </div>
            </div>
            </div>
            `;
        }else{
            tableRow += `
            <div class="row mt-3">
            <div class="card bg-light text-dark col-4">
            <div class="col-8"></div>
                <div class="card-body">
                ${reply.uname}
                &nbsp; &nbsp;
                ${reply.regTime}
                <br>
                ${reply.rep}
                </div>
            </div>
            </div>
            `;

        }
    }
	return `
        ${template.header()}
        ${template.nav(uname)}
        <div class="container" style="margin-top: 90px;">  
        <div class="container">
            <h2>글읽기</h2>
       
            <table class="table">
                <tr>
                <td><h3>제목 : &nbsp; ${result.title}</h3> 글번호 : ${result.bid} | ${result.modTime}</td>
                <td class ="text-right"><h3>작성자 :  &nbsp;${result.uname}</h3>조회 ${result.viewCount} 리플 ${result.replyCount}</td>
                </tr>
            </table>
            <table class="table table-bordered">
            <td>
            <p>${result.content}</p>
            </td>
            </table>
            <div align="right">
            <h4>
            <a href="/bbs/update/${result.bid}/${result.uid}"><i class="fas fa-edit"></i></a> 
            <a href="/bbs/deleteform/${result.bid}/${result.uid}"><i class="fas fa-trash-alt"></i></a>
            </h4>
            </div>
            <hr>
            ${tableRow}
            <form action="/bbs/reply" method="post" >
            <div class="col-12 mt-5">
                <input type="hidden" name="bid" value="${result.bid}">
                <input type="hidden" name="uid" value="${result.uid}">
                <input type="text" class="form-control" id="rep" placeholder="댓글을 입력하세요. (100자이내)" name="rep">
            </div>
            <div class="col-2"  style="margin-bottom: 90px;">
                <button type="submit" class="btn btn-primary mt-3">남기기</button>
            </div>
            </form>
            </div>
        </div>
            
        ${template.footer()}
    `;
}
