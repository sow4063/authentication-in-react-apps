const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// 이 디렉토리에서 정적 파일을 찾도록 지시한다.
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist'));
// app에 HTTP body message를 알린다.
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);

// 서버를 시작한다.
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
