import React from 'react';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import Select from '../../../../UI/Select';
// import { SignUpController } from '../../controllers/signin.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Link } from 'react-router-dom';

export const SignInForm = () => {
  //   const dispatch = useAppDispatch();
  //   const signUp = useAppSelector((state) => state.signUp);
  //   const controller = new SignUpController(dispatch);

  return (
    <div className='sign-in-form'>
      <h2 className='sign-in-form__header'>Вход</h2>
      <Input
        label='Email'
        placeholder='Введите email'
        // value={signUp.email}
        classNames={['sign-in-form__input']}
        // onInput={controller.onEmailChange}
      />
      <Input
        label='Пароль'
        placeholder='Введите пароль'
        // value={signUp.password}
        classNames={['sign-in-form__input']}
        // onInput={controller.onPasswordChange}
      />
      <Button classNames={['sign-in-form__sign-in']} label={'Войти'} />
      <span>
        Нет аккаунта? <Link to={'/signup'}>Зарегистрироваться</Link>
      </span>
    </div>
  );
};
