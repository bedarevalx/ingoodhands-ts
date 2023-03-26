export const VALIDATE_REGEXS = {
  //   PHONE: new RegExp('/(?:+?)[78]+[0-9() -]{16,17}/'),
  PASSWORD_RECOMMEND: new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{9,})',
  ),
  PASSWORD_REQUIRED: new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
  ),
};
