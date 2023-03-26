import React, { useEffect } from 'react';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import Select from '../../../../UI/Select';
import { SignUpController } from '../../controllers/sign-up.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { Link } from 'react-router-dom';
import LoadedButton from '../../../../UI/LoadedButton';
import MaskedInput from '../../../../UI/MaskedInput';
import PasswordIndicator from '../PasswordIndicator';
import SignUpBg from '../../../../assets/vector/signup-bg3.svg';

export const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const signUp = useAppSelector((state) => state.signUp);
  const controller = new SignUpController(dispatch);
  const app = useAppSelector((state) => state.app);

  const cityOptions = app.cities.map((city) => ({
    id: city.id,
    title: city.name,
    value: city.id,
  }));

  useEffect(() => {
    return () => {
      controller.clearValues();
    };
  }, []);

  return (
    <div
      className='sign-up-form'
      style={{
        backgroundImage: `url('${SignUpBg}')`,
        backgroundSize: 'cover',
      }}>
      <h2 className='sign-up-form__header'>Регистрация</h2>
      <Input
        label='Email'
        placeholder='Введите email'
        value={signUp.email}
        classNames={['sign-up-form__input']}
        onInput={controller.onEmailChange}
        error={signUp.errors.email}
        onBlur={controller.onEmailBlur}
      />
      <Input
        label='Имя'
        placeholder='Введите имя'
        value={signUp.name}
        classNames={['sign-up-form__input']}
        onInput={controller.onNameChange}
        error={signUp.errors.name}
        onBlur={controller.onNameBlur}
      />
      <MaskedInput
        label='Номер телефона'
        placeholder='Введите номер телефона'
        value={signUp.phoneNumber}
        mask='+7 (999) 999-9999'
        classNames={['sign-up-form__input']}
        onInput={controller.onPhoneNumberChange}
        error={signUp.errors.phoneNumber}
        onBlur={controller.onPhoneNumberBlur}
      />
      <Select
        label='Город'
        value={signUp.city}
        placeholder='Выберите ваш город'
        classNames={['sign-up-form__select']}
        onChange={controller.onCityChange}
        options={cityOptions}
        error={signUp.errors.city}
      />
      <Input
        label='Пароль'
        type='password'
        placeholder='Введите пароль'
        value={signUp.password}
        classNames={['sign-up-form__input']}
        onInput={controller.onPasswordChange}
        error={signUp.errors.password}
        onBlur={controller.onPasswordBlur}>
        <PasswordIndicator />
      </Input>
      <Input
        label='Подтвердите пароль'
        placeholder='Повторите пароль'
        type='password'
        value={signUp.passwordRepeat}
        classNames={['sign-up-form__input']}
        onInput={controller.onPasswordRepeatChange}
        error={signUp.errors.passwordRepeat}
        onBlur={controller.onPasswordRepeatBlur}
      />
      <LoadedButton
        classNames={['sign-up-form__sign-up']}
        label={'Зарегистрироваться'}
        isLoading={signUp.isLoading}
        onClick={controller.onSignUp}
      />
      <div className='sign-up-form__have-account'>
        <span>Уже зарегистрированы? </span>
        <Link to={'/sign-in'} className='sign-up-form__link'>
          Войти
        </Link>
      </div>
    </div>
  );
};
