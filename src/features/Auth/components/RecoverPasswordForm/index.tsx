import React, { useEffect, useState, MouseEvent, ChangeEvent } from 'react';
import SignInBg from '../../../../assets/vector/signup-bg.svg';
import Input from '../../../../UI/Input';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import useCountdown from '../../../../hooks/useCountdown';
import { APP_CONSTANTS } from '../../../../constants/app';
import Validator from '../../helpers/validator';
import { Password } from '@mui/icons-material';
import PasswordIndicator from '../PasswordIndicator';
import {
  checkResetPasswordCode,
  resetPassword,
  sendResetPasswordEmail,
} from '../../../../api/in-good-hands.api';

export const RecoverPasswordForm = () => {
  const [isLetterSended, setIsLetterSended] = useState(false);
  const [isSendingLetter, setIsSendingLetter] = useState(false);
  const [changePasswordCode, setChangePasswordCode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isPasswordReseting, setIsPasswordReseting] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number | null>(null);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const { timeLeft, startTimer } = useCountdown(
    APP_CONSTANTS.DEFAULT_WAITING_TIME,
  );

  const handleSendLetter = async () => {
    if (emailError.length !== 0) {
      return;
    }

    try {
      setIsSendingLetter(true);
      const response = await sendResetPasswordEmail(emailInput);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsSendingLetter(false);
    setIsLetterSended(true);
    startTimer(APP_CONSTANTS.DEFAULT_WAITING_TIME);
  };

  const handleSendLetterAgain = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLetterSended(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isEmail = Validator.isEmail(e.target.value);
    setEmailInput(e.target.value);
    if (isEmail) {
      setEmailError('');
    }
  };

  const onEmailBlur = () => {
    const isEmail = Validator.isEmail(emailInput);
    if (!isEmail) {
      setEmailError('invalid_email');
    }
  };
  const onPasswordBlur = () => {
    const strength = Validator.getPasswordStrength(passwordInput);
    if (strength === 0) {
      setPasswordError('weak_password');
    }
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const strength = Validator.getPasswordStrength(e.target.value);
    setPasswordStrength(strength);
    setPasswordInput(e.target.value);
    if (strength > 0) {
      setPasswordError('');
    }
  };

  const onResetPassword = async () => {
    try {
      setIsPasswordReseting(true);
      const response = await resetPassword(passwordInput, changePasswordCode);
      navigate('/sign-in');
    } catch (error) {}
    setIsPasswordReseting(false);
  };

  useEffect(() => {
    (async () => {
      if (!!params.get('token') && params.get('token')?.length) {
        try {
          const response = await checkResetPasswordCode(
            params.get('token') as string,
          );
          if (response.data.isValid === true) {
            setChangePasswordCode(params.get('token') as string);
          }
        } catch (error) {}
      }
    })();

    startTimer(APP_CONSTANTS.DEFAULT_WAITING_TIME);
  }, []);

  const isSendLetterDisabled =
    emailError.length !== 0 || emailInput.length === 0;

  const isResetPasswordDisabled =
    passwordError.length !== 0 ||
    passwordStrength === 0 ||
    passwordStrength === null ||
    passwordInput.length === 0;

  return (
    <div
      className='recover-password-form'
      style={{
        backgroundImage: `url('${SignInBg}')`,
        backgroundSize: 'cover',
      }}>
      <h2 className='recover-password-form__header'>Восстановление пароля</h2>

      {changePasswordCode && (
        <>
          <Input
            label='Пароль'
            placeholder='Введите новый пароль'
            value={passwordInput}
            error={passwordError}
            classNames={['recover-password-form__password-input']}
            onInput={handlePasswordChange}
            onBlur={onPasswordBlur}
          />
          <PasswordIndicator passwordStrength={passwordStrength} />

          <LoadedButton
            classNames={['recover-password-form__send-letter']}
            disabled={isResetPasswordDisabled}
            isLoading={isPasswordReseting}
            onClick={onResetPassword}
            label='Изменить пароль'
          />
        </>
      )}

      {!changePasswordCode &&
        (isLetterSended ? (
          <>
            <div className='recover-password-form__letter-sended'>
              <p>Мы отправили письмо на {emailInput}</p>
              <p>Перейдите по ссылке в письме, чтобы изменить пароль</p>
            </div>
            <div className='recover-password-form__send-again'>
              {timeLeft > 0 ? (
                `Отправить еще раз через ${timeLeft} сек.`
              ) : (
                <a
                  href=''
                  onClick={handleSendLetterAgain}
                  className='recover-password-form__link'>
                  Отправить еще раз
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <Input
              label='Email'
              placeholder='Введите email'
              value={emailInput}
              error={emailError}
              classNames={['recover-password-form__input']}
              onInput={handleEmailChange}
              onBlur={onEmailBlur}
            />
            <LoadedButton
              classNames={['recover-password-form__send-letter']}
              disabled={isSendLetterDisabled}
              isLoading={isSendingLetter}
              onClick={handleSendLetter}
              label='Отправить письмо'
            />
          </>
        ))}

      <div className='recover-password-form__no-account'>
        <span>Вспомнили пароль? </span>
        <Link to={'/sign-in'} className={'recover-password-form__link'}>
          Войти
        </Link>
      </div>
    </div>
  );
};
