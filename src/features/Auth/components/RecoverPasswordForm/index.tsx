import React, { useEffect } from 'react';
import SignInBg from '../../../../assets/vector/signup-bg.svg';
import Input from '../../../../UI/Input';
import { Link } from 'react-router-dom';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import useCountdown from '../../../../hooks/useCountdown';
import { APP_CONSTANTS } from '../../../../constants/app';

export const RecoverPasswordForm = () => {
  const { timeLeft, startTimer } = useCountdown(
    APP_CONSTANTS.DEFAULT_WAITING_TIME,
  );

  const handleSendLetter = () => {
    startTimer(APP_CONSTANTS.DEFAULT_WAITING_TIME);
  };

  useEffect(() => {
    startTimer(APP_CONSTANTS.DEFAULT_WAITING_TIME);
  }, []);

  return (
    <div
      className='recover-password-form'
      style={{
        backgroundImage: `url('${SignInBg}')`,
        backgroundSize: 'cover',
      }}>
      <h2 className='recover-password-form__header'>Восстановление пароля</h2>
      <Input
        label='Email'
        placeholder='Введите email'
        // value={signIn.email}
        // error={signIn.errors.email}
        classNames={['recover-password-form__input']}
        // onInput={controller.onEmailChange}
        // onBlur={controller.onEmailBlur}
      />
      <LoadedButton
        classNames={['recover-password-form__send-letter']}
        isLoading={true}
        label='Отправить письмо'
      />
      <div className=''>Отправить еще раз через {timeLeft} сек.</div>
      <div className='recover-password-form__no-account'>
        <span> Помните пароль? </span>
        <Link to={'/sign-in'} className={'recover-password-form__link'}>
          Войти
        </Link>
      </div>
    </div>
  );
};
