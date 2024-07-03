var http = require('http'); // http 모듈을 가져와서 http변수에 할당해줌.
var fs = require('fs'); // 마찬가지 파일시스템 모듈 가져와서 할당
var url = require('url'); // 마찬가지 url 모듈 가져와서 할당

var app = http.createServer(function (request, response) {
    // http.createServer()로 http서버 생성
    // function 은 콜백함수로써 클라이언트의 요청이 있을때마다 실행됨.
    var _url = request.url; // 요청 url 을 _url에 저장한다.
    var queryData = url.parse(_url, true).query; // url의 query 문자열 파싱하고, queryData 변수에 저장.
    var title = queryData.id;
    // console.log(url.parse(_url, true));
    var pathname = url.parse(_url, true).pathname; // 요청받은 url에서 pathname을 pathname 변수에 저장.

    if (pathname === '/') {// 사이트의 경로는 /~~로 이루어졌는데 일단 쿼리 전까지의 주소가 더 있다? 그러면 404 띄워버림.
        fs.readdir('./data', function (err, filelist) {
            // 파일시스템 모듈에서 readdir 함수는 이 파일을 실행 했을때의 파일 위치 기준으로, data 디렉터리에 있는 파일들 콜백함수의 filelist에 저장.
            var i = 0;
            var list = '<ul>';
            while (i < filelist.length) {
                list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                i = i + 1;
            }
            list = list + '</ul>'; // 여까진 알겠지

            if (queryData.id === undefined) {// url에서 쿼리 데이터 아이디가 undefined면, 홈이라는거니까 아래거 실행
                title = 'Welcome';
                var description = 'this is home';
                var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title> 
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2> 
                    <p>${description}</p>
                </body>
                </html>`;
                response.writeHead(200);// 클라이언트한테 200(정상) 반환
                response.end(template);
            }
            else {// 아닌거면 밑에 p 태그에 뭐시기 출력해야하니까
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {// 얘는 data에 있는 file들 가져와야해서 readFile 함수사용.
                    // 파일 읽기 및 응답 생성코드
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title> 
                    <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>`;
                    response.end(template); // 끝날때 template 출력~
                });
            }
        });
    }
    else {// 만약 url의 pathname 이 '/' 가 아니면, 구현 안된데 참조하는거니까 404
        response.writeHead(404);
        response.end('Not found');//Not found 라는것도 출력해줌
    }
});
app.listen(3000); // 3000번 포트 쓸게여 http://localhost:3000
