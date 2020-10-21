module.exports = {
    header:     function() {
        
        return `

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>My BBS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="/fontawesome-free-5.15.1-web/css/all.min.css">
    <script src="/jquery/jquery.min.js"></script>
    <script src="/popper/popper.min.js"></script>
    <script src="/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
        `;
    },
    nav :   function(uname){
        return`
        <div class="row">
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <a class="navbar-brand" href="/bbs">
            <img src="/img/hshs.png" alt="호서직업능력개발원"
                style="height: 25px; margin-left: 20px; margin-right: 20px;">
        </a>
        <ul class="nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/bbs"><i class="fas fa-home"></i>홈</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/insert">글쓰기</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="/users">사용자</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout">로그아웃</a>
            </li>
        </ul>
        <div class="input-group col-3">
        <form action="/bbs/search" method="post">
            <div class="input-group">
            <input type="search" name="searched" id="searched" class="form-control" placeholder="제목을 검색하세요.">
            <div class="input-group-append">
            <button class="btn btn-success" type="submit">검색</button>
            </div>
            </div>
            </form>
        </div>
        <div class="navbar-text fixed-right" id="weather">
            ${uname}님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-cloud-sun"></i> 20&deg;C
        </div>
        </nav>
        </div>
        `
    },
    footer:     function() {
        return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
        <span class="navbar-text">
            Copyright &copy; 2020 Hoseo Institute of Big Data
        </span>
    </nav>
</body>
</html>
        `;
    }
}