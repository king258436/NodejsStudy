var http = require('http'); // http 모듈을 가져와서 http변수에 할당해줌.
var fs = require('fs'); // 마찬가지 파일시스템 모듈 가져와서 할당
var url = require('url'); // 마찬가지 url 모듈 가져와서 할당

var app = http.createServer(function (request, response) {
    // http.createServer()로 http서버 생성
    // function 은 콜백함수로써 클라이언트의 요청이 있을때마다 실행됨.
    var _url = request.url; // 요청 url 을 _url에 저장한다.
    var queryData = url.parse(_url, true).query; // url의 query 문자열 파싱하고, queryData 변수에 저장.
    var title = queryData.id;
    if (_url == '/') {
        // 그냥 localhost:3000일 경우에 실행
        title = 'Welcome';
    }
    if (_url == '/favicon.ico') {
        //요청이 '/favicon.ico'라면, 404 상태 코드를 반환하고 요청을 종료합니다. 파비콘이라는데 잘 모르겠음.
        return response.writeHead(404);
    }
    response.writeHead(200); // 는 Node.js HTTP 서버에서 클라이언트에게 응답을 보낼 때 사용되는 메서드입니다. 이 메서드는 HTTP 응답 헤더를 설정하며, 200은 HTTP 상태 코드로 "OK"를 의미합니다. 즉, 요청이 성공적으로 처리되었음을 나타냅니다.
    fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        // 파일 읽기 및 응답 생성코드
        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title> <!--현재 읽은 쿼리 아이디에 따라 title 값이 달라짐-->
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1> <!--WEB의 url 은 없음 그냥 /임-->
        <ul>
          <li><a href="/?id=HTML">HTML</a></li> <!--HTML은 http://localhost:3000/?id=HTML 임-->
          <li><a href="/?id=CSS">CSS</a></li> <!--CSS는 http://localhost:3000/?id=CSS 임-->
          <li><a href="/?id=JavaScript">JavaScript</a></li> <!--JavaScript는 http://localhost:3000/?id=JavaScript 임-->
        </ul>
        <h2>${title}</h2> <!--바로 위에서 보여준것 처림 쿼리 값만 띠어와서 title에 넣으니까 각각 업슴, HTML,CSS,JavaScript-->
        <p>${description}</p><!--해당 쿼리문 이름에 따라 data디렉터리 안의 파일 불러와서 여기에 출력함-->
      </body>
      </html>
      `;
        response.end(template); // 끝날때 template 출력~
    });
});
app.listen(3000); // 3000번 포트 쓸게여 http://localhost:3000
