const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');

/**
 * 인증 확인 미들웨어 펑션
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};

/**
 * 이 파일에서 HTTP 헤더에 authorization 헤더가 있는지 확인합니다. 
 * 그런 다음 토큰을 디코딩하여 사용자의 ID를 얻습니다. 
 * 이 ID를 통해 사용자가 실제로 존재하는지 확인하려고합니다. 
 * 어떤 단계에서 받아 들일 수없는 무언가가 발생하면 우리는 401 상태 코드 (무단)로 응답을 되돌려 보낼 것입니다.
 */
