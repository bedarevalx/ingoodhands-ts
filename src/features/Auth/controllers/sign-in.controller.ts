import { ISignInController } from '../../../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import Validator from '../helpers/validator';
import { NavigateFunction } from 'react-router-dom';
import {
  setEmail,
  setError,
  setPassword,
  clearValues,
} from '../slices/signin.slice';
import { SelectChangeEvent } from '@mui/material';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../../../constants/app';

export class SignInController implements ISignInController {
  authService: AuthService;
  dispatch: AppDispatch;
  getState: () => RootState;
  navigate: NavigateFunction;

  constructor(dispatch: AppDispatch, navigate: NavigateFunction) {
    this.dispatch = dispatch;
    this.authService = new AuthService(dispatch);
    this.getState = store.getState;
    this.navigate = navigate;
  }

  onSignIn = async () => {
    const { signIn } = this.getState();
    this.validateEmail(signIn.email);
    this.validatePassword(signIn.password);
    const isHasErrors = this.hasErrors();
    const isHasEmptyFields = this.hasEmptyFields();
    if (!isHasErrors && !isHasEmptyFields) {
      try {
        await this.dispatch(this.authService.signIn(() => this.navigate('/')));
      } catch (error) {}
    }
  };

  hasErrors = (): boolean => {
    const errors = this.getState().signIn.errors;
    let result = false;

    for (const [key, value] of Object.entries(errors)) {
      if (value && key !== 'signIn') {
        console.log(key);

        result = true;
      }
    }
    console.log(result);

    return result;
  };
  hasEmptyFields = () => {
    const signIn = this.getState().signIn;
    const fields = {
      email: signIn.email,
      password: signIn.password,
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
    if (event.target.value.length >= APP_CONSTANTS.MIN_PASSWORD_LENGTH) {
      this.dispatch(
        setError({
          type: 'password',
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

  onEmailBlur = (event: ChangeEvent<HTMLInputElement>) => {
    this.validateEmail(event.target.value);
  };
  onPasswordBlur = (event: ChangeEvent<HTMLInputElement>) => {
    this.validatePassword(event.target.value);
  };

  validatePassword = (value: string) => {
    if (value.length < APP_CONSTANTS.MIN_PASSWORD_LENGTH) {
      this.dispatch(
        setError({
          type: 'password',
          message: 'error_password_length',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'password',
          message: '',
        }),
      );
    }
  };

  validateEmail = (value: string) => {
    if (!Validator.isEmail(value)) {
      this.dispatch(
        setError({
          type: 'email',
          message: 'invalid_email',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'email',
          message: '',
        }),
      );
    }
  };

  clearValues = () => {
    this.dispatch(clearValues());
  };
}
