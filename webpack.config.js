const path = require('path');

module.exports = {
  // bundle, 여기서 부터 읽기 시작한다.
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // bundle, 이곳에 쓴다.
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js'
  },

  module: {

    // 조건을, 만족하는 파일에 loaders를 적용한다.
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }],
  },

  // watch 모드에서 웹팩을 시작하면, 번들에 변경이 생길 시 리빌드한다.
  watch: true
};
