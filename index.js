const express = require('express');

const app = express();
// 이 디렉토리에서 정적 파일을 찾도록 지시한다.
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist'));

// 서버를 시작한다.
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
