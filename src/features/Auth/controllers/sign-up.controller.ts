import {
  IAuthService,
  ISignUpController,
} from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent, FocusEvent } from 'react';
import Validator from '../helpers/validator';
import {
  clearValues,
  setCity,
  setEmail,
  setError,
  setName,
  setPassword,
  setPasswordRepeat,
  setPasswordStrength,
  setPhoneNumber,
} from '../slices/signup.slice';
import { SelectChangeEvent } from '@mui/material';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../../../constants/app';

export class SignUpController implements ISignUpController {
  authService: AuthService;
  dispatch: AppDispatch;
  getState: () => RootState;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.authService = new AuthService(dispatch);
    this.getState = store.getState;
  }
  onSignUp = () => {
    const { signUp } = this.getState();
    this.validatePassword(signUp.password);
    this.validatePasswordRepeat(signUp.passwordRepeat);
    this.validateEmail(signUp.email);
    this.validateCity(signUp.city);
    this.validateName(signUp.name);
    this.validatePhoneNumber(signUp.phoneNumber);
    const isHasEmptyFields = this.hasEmptyFields();
    const isHasErrors = this.hasErrors();
    if (!isHasEmptyFields && !isHasErrors) {
      this.dispatch(this.authService.signUp());
    }
  };

  //@TODO: Подумать куда перенести
  hasErrors = (): boolean => {
    const errors = this.getState().signUp.errors;
    let result = false;

    for (const [key, value] of Object.entries(errors)) {
      if (value && key !== 'signUp') {
        result = true;
      }
    }

    return result;
  };
  //@TODO: Подумать куда перенести
  hasEmptyFields = () => {
    const signUp = this.getState().signUp;
    const fields = {
      email: signUp.email,
      password: signUp.password,
      // birthDate: signUp.birthDate,
      name: signUp.name,
      phoneNumber: signUp.phoneNumber,
      city: signUp.city,
      // lastName: signUp.lastName,
      //   isAgeConfirmed: signUp.isAgeConfirmed,
    };
    let fieldKeys: string[] = [];

    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        fieldKeys.push(key);
        this.dispatch(
          setError({
            type: key,
            message: 'empty_field',
          }),
        );
      }
    }

    return !!fieldKeys.length;
  };

  onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setPassword(event.target.value));
    const strengthLevel = Validator.getPasswordStrength(event.target.value);
    this.dispatch(setPasswordStrength(strengthLevel));
    if (strengthLevel > 0) {
      this.dispatch(
        setError({
          type: 'password',
          message: '',
        }),
      );
    }
  };

  onPasswordRepeatChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setPasswordRepeat(event.target.value));
    const signUp = store.getState().signUp;
    if (event.target.value === signUp.password) {
      this.dispatch(
        setError({
          type: 'passwordRepeat',
          message: '',
        }),
      );
    }
  };

  onCityChange = (event: SelectChangeEvent) => {
    this.dispatch(setCity(event.target.value));
    this.dispatch(
      setError({
        type: 'city',
        message: '',
      }),
    );
  };

  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setName(event.target.value));
    if (event.target.value.length > 0) {
      this.dispatch(
        setError({
          type: 'name',
          message: '',
        }),
      );
    }
  };

  onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setEmail(event.target.value));
    if (Validator.isEmail(event.target.value)) {
      this.dispatch(
        setError({
          type: 'email',
          message: '',
        }),
      );
    }
  };

  onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setPhoneNumber(event.target.value));
    if (event.target.value.length === APP_CONSTANTS.MIN_PHONE_NUMBER_LENGTH) {
      this.dispatch(
        setError({
          type: 'phoneNumber',
          message: '',
        }),
      );
    }
  };

  validatePassword = (value: string) => {
    const strengthLevel = Validator.getPasswordStrength(value);
    this.dispatch(setPasswordStrength(strengthLevel));
    if (strengthLevel > 0) {
      this.dispatch(
        setError({
          type: 'password',
          message: '',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'password',
          message: 'weak_password',
        }),
      );
    }
  };

  validatePasswordRepeat = (value: string) => {
    const signUp = this.getState().signUp;
    if (signUp.password !== value) {
      this.dispatch(
        setError({
          type: 'passwordRepeat',
          message: 'invalid_password_repeat',
        }),
      );
    }
    if (value.length === 0) {
      this.dispatch(
        setError({
          type: 'passwordRepeat',
          message: 'empty_field',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'passwordRepeat',
          message: '',
        }),
      );
    }
  };

  validateEmail = (value: string) => {
    if (Validator.isEmail(value)) {
      this.dispatch(
        setError({
          type: 'email',
          message: '',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'email',
          message: 'invalid_email',
        }),
      );
    }
  };

  validateCity = (value: string) => {
    if (value === '-1') {
      this.dispatch(
        setError({
          type: 'city',
          message: 'empty_field',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'city',
          message: '',
        }),
      );
    }
  };

  validateName = (value: string) => {
    if (value.length === 0) {
      this.dispatch(setError({ type: 'name', message: 'empty_field' }));
    }
  };

  validatePhoneNumber = (value: string) => {
    if (value.length < APP_CONSTANTS.MIN_PHONE_NUMBER_LENGTH) {
      this.dispatch(
        setError({ type: 'phoneNumber', message: 'invalid_phone_number' }),
      );
    }
  };

  onEmailBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.validateEmail(event.target.value);
  };
  onNameBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.validateName(event.target.value);
  };
  onPhoneNumberBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.validatePhoneNumber(event.target.value);
  };
  onPasswordBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.validatePassword(event.target.value);
  };
  onPasswordRepeatBlur = (event: FocusEvent<HTMLInputElement>) => {
    this.validatePasswordRepeat(event.target.value);
  };

  clearValues = () => {
    this.dispatch(clearValues());
  };
}
