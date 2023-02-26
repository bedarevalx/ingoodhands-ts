import { ISignUpController } from '../../../interfaces/signUp.interfaces';
// import { IAuthService } from '../interfaces/auth.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
// import { AuthService } from '../services/auth.service';
// import { UserService } from '../services/user.service';
import { ChangeEvent } from 'react';
import Validator from '../helpers/validator';
import { NavigateFunction } from 'react-router-dom';
import {
  setCity,
  setEmail,
  setError,
  setName,
  setPassword,
  setPhoneNumber,
} from '../slices/signup.slice';
import { SelectChangeEvent } from '@mui/material';

export class SignUpController implements ISignUpController {
  //   authService: IAuthService;
  dispatch: AppDispatch;
  //   userService: UserService;
  getState: () => RootState;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    // this.authService = new AuthService();
    // this.userService = new UserService();
    this.getState = store.getState;
  }
  //@TODO: Подумать куда перенести
  hasErrors = (): boolean => {
    const errors = this.getState().signUp.errors;
    let result = false;

    for (const [_, value] of Object.entries(errors)) {
      if (value) {
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
    // this.dispatch(setPasswordStrength(strengthLevel));

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
          message: 'invalid_password',
        }),
      );
    }
  };

  onCityChange = (event: SelectChangeEvent) => {
    this.dispatch(setCity(event.target.value));
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
    } else {
      this.dispatch(
        setError({
          type: 'name',
          message: 'empty_field',
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
    } else {
      this.dispatch(
        setError({
          type: 'email',
          message: 'invalid_email',
        }),
      );
    }
  };

  onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setPhoneNumber(event.target.value));
    if (event.target.value.length > 0) {
      this.dispatch(
        setError({
          type: 'phone_number',
          message: '',
        }),
      );
    } else {
      this.dispatch(
        setError({
          type: 'phone_number',
          message: 'empty_field',
        }),
      );
    }
  };

  //   clearValues = () => {
  //     this.dispatch(clear());
  //   };
}
