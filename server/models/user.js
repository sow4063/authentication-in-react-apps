const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 유저 모델 스키마 정의
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
});

/**
 * 전달 된 암호를 데이터베이스의 값과 비교한다.
 * 
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // 새 문서이거나 암호 필드가 변경된 경우에만 실행된다.
  if (!user.isModified('password')) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // 패스워드를 해쉬값으로 변경한다.
      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);

/**
 * 사용자 컬렉션을 설명하기 위해 세 개의 필드 (전자 메일, 이름 및 암호) 만 사용했습니다. 
 * 이메일 필드의 경우 제한 사항을 설정 했으므로 전체 컬렉션에서 고유해야합니다.
 * 또한 UserSchema.pre('save') 하기 전에 실행될 후크 메서드 인 UserSchema.pre('save') 를 확인할 수 있습니다. 
 * 이 메서드에서 bcrypt 모듈은 이전에 생성 된 salt 스트링과 사용자의 암호에서 해시를 생성합니다. 사용자 암호 대신 이 해시가 컬렉션에 저장됩니다.
 */

/**
 * 이 생성은 새 문서이거나 암호 필드가 변경된 경우에만 실행됩니다 : user.isModified('password')
 * 스키마에는 UserSchema.methods.comparePassword 메서드가 포함되어 있습니다. 
 * 이 메서드는 사용자가 올바른 암호를 제공했는지 확인하려는 경우 호출합니다.
 */
