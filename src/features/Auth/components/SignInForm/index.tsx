import React, { useEffect } from 'react';
import Input from '../../../../UI/Input';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Link, useNavigate } from 'react-router-dom';
import { SignInController } from '../../controllers/sign-in.controller';
import LoadedButton from '../../../../UI/LoadedButton';
import SignInBg from '../../../../assets/vector/signup-bg.svg';

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const signIn = useAppSelector((state) => state.signIn);
  const navigate = useNavigate();
  const controller = new SignInController(dispatch, navigate);

  useEffect(() => {
    return () => {
      controller.clearValues();
    };
  }, []);

  return (
    <div
      className='sign-in-form'
      style={{
        backgroundImage: `url('${SignInBg}')`,
        backgroundSize: 'cover',
      }}>
      <h2 className='sign-in-form__header'>Вход</h2>
      <Input
        label='Email'
        placeholder='Введите email'
        value={signIn.email}
        error={signIn.errors.email}
        classNames={['sign-in-form__input']}
        onInput={controller.onEmailChange}
        onBlur={controller.onEmailBlur}
      />
      <Input
        label='Пароль'
        placeholder='Введите пароль'
        type='password'
        value={signIn.password}
        error={signIn.errors.password}
        classNames={['sign-in-form__input']}
        onInput={controller.onPasswordChange}
        onBlur={controller.onPasswordBlur}
      />
      <LoadedButton
        isLoading={signIn.isLoading}
        classNames={['sign-in-form__sign-in']}
        onClick={controller.onSignIn}
        label={'Войти'}
      />
      <div className='sign-in-form__no-account'>
        <span> Нет аккаунта? </span>
        <Link to={'/sign-up'} className={'sign-in-form__link'}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
