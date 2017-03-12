const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// 데이터베이스 와 모델을 연결한다.
require('./server/models').connect(config.dbUri);

const app = express();
// 이 디렉토리에서 정적 파일을 찾도록 지시한다.
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist'));
// app에 HTTP body message를 알린다.
app.use(bodyParser.urlencoded({ extended: false }));
// 패스포트 미들웨어를 사용한다.
app.use(passport.initialize());

// 패스포트 전략들을 로드한다.
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

/**
 * 애플리케이션의 엔트리 파일에서 우리는 `/ api routes` 를 선언하기 전에 authenticaion checker 미들웨어를 적용했다는 것을 기억하십시오.
 * 이렇게하면 /api 경로로 진행하기 전에 미들웨어 기능이 실행되는지 확인할 수 있습니다.
 */
// 인증 체커 미들웨어를 사용한다.
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// 서버를 시작한다.
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
