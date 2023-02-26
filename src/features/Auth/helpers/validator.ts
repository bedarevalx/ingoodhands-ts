const validator = require('validator');

class Validator {
  static isEmail = (email: string) => validator.isEmail(email);

  static getPasswordStrength = (password: string) => {
    if (password?.length === 0) {
      return 0;
    }
    const strongRegEx = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{9,})',
    );
    const normalRegEx = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
    );
    let strength = 0;
    if (normalRegEx.test(password)) {
      strength = 1;
    } else {
      strength = 0;
    }
    if (strongRegEx.test(password)) {
      strength = 2;
    }
    return strength;
  };
}

export default Validator;
