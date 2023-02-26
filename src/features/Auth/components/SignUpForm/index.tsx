import React from 'react';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import Select from '../../../../UI/Select';
import { SignUpController } from '../../controllers/sign-up.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Link } from 'react-router-dom';

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const signUp = useAppSelector((state) => state.signUp);
  const controller = new SignUpController(dispatch);

  return (
    <div className='sign-up-form'>
      <h2 className='sign-up-form__header'>Регистрация</h2>
      <Input
        label='Email'
        placeholder='Введите email'
        value={signUp.email}
        classNames={['sign-up-form__input']}
        onInput={controller.onEmailChange}
      />
      <Input
        label='Имя'
        placeholder='Введите имя'
        value={signUp.name}
        classNames={['sign-up-form__input']}
        onInput={controller.onNameChange}
      />
      <Input
        label='Номер телефона'
        placeholder='Введите номер телефона'
        value={signUp.phoneNumber}
        classNames={['sign-up-form__input']}
        onInput={controller.onPhoneNumberChange}
      />
      <Select
        label='Город'
        value={signUp.city}
        placeholder='Выберите ваш город'
        classNames={['sign-up-form__select']}
        onChange={controller.onCityChange}
      />
      <Input
        label='Пароль'
        placeholder='Введите пароль'
        value={signUp.password}
        classNames={['sign-up-form__input']}
        onInput={controller.onPasswordChange}
      />
      <Input
        label='Подтвердите пароль'
        placeholder='Повторите пароль'
        value={signUp.password}
        disabled
        classNames={['sign-up-form__input']}
      />
      <Button
        classNames={['sign-up-form__sign-up']}
        label={'Зарегистрироваться'}
      />
      <span>
        Уже зарегистрированы? <Link to={'/signin'}>Войти</Link>
      </span>
    </div>
  );
};
