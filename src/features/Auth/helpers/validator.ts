import { VALIDATE_REGEXS } from '../../../constants/regexs';

import validator from 'validator';

class Validator {
  static isEmail = (email: string) => validator.isEmail(email);

  static getPasswordStrength = (password: string) => {
    if (password?.length === 0) {
      return 0;
    }
    const strongRegEx = VALIDATE_REGEXS.PASSWORD_RECOMMEND;
    const normalRegEx = VALIDATE_REGEXS.PASSWORD_REQUIRED;
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
