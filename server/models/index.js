const mongoose = require('mongoose');

// index.js 에서 require('./server/models').connect(config.dbUri); 로 불려질 것이다.
module.exports.connect = (uri) => {
  mongoose.connect(uri);
  // 몽구스 프로미스 라이브러리 대체 (will deprecate..)
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
}

/**
 * 데이터를 저장하기 전에 컬렉션 구조 (스키마)를 설명해야합니다. 
 * 그러나 MongoDB는 동적 인 스키마를 가지고 있으며, 거의 모든 데이터를 콜렉션에 자동으로 맞춥니다. 
 * Mongoose는 고정 스키마가 필요한 데이터베이스에 우리 애플리케이션을 연결하는 데 도움이되는 라이브러리입니다. 
 * 그러나 그들을 변경하는 것은 매우 쉽고 때로는 고통 스럽습니다. 사용자 컬렉션을 설명해 보겠습니다.
 */
