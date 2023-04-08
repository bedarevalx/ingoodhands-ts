import React from 'react';
import Modal from '../../../../UI/Modal';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import { MuiOtpInput } from 'mui-one-time-password-input';

interface IConfirmEmailForm {
  classNames?: string[];
  handleClose?: () => void;
  email: string;
  handleSendLetter: () => void;
  handleCheckCode: () => void;
  handleCodeChange: (value: string) => void;
  isCodeChecking: boolean;
  isEmailSending: boolean;
  isEmailSended: boolean;
  emailCode: string;
  error?: string;
}

const ConfirmEmailForm = (props: IConfirmEmailForm) => {
  return (
    <div className={classNamesParser('confirm-email-form', props.classNames)}>
      {!props.isEmailSended ? (
        <>
          <div className='confirm-email-form__header'>
            <h3 className='confirm-email-form__title'>Подтверждение почты</h3>
            <IconButton
              className='confirm-email-form__close-btn'
              onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='confirm-email-form__instruction'>
            <p>
              Подтверждение почты позволит Вам размещать свои объявления на
              сервисе. Для подтверждения нажмите на кнопку ниже.
            </p>
            <p>
              На Вашу электронную почту будет выслан код. Введите этот код в
              соответствующие поля
            </p>
          </div>
          <div className='confirm-email-form__send-wrapper'>
            <LoadedButton
              classNames={['confirm-email-form__send-code']}
              label='Отправить код'
              isLoading={props.isEmailSending}
              onClick={props.handleSendLetter}
            />
          </div>
        </>
      ) : (
        <>
          <div className='confirm-email-form__header'>
            <h3 className='confirm-email-form__title'>Введите код</h3>
            <p className='confirm-email-form__code-sended'>
              Код отправлен на вашу электронную почту {props.email}
            </p>
            <IconButton
              className='confirm-email-form__close-btn'
              onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='confirm-email-form__code-wrapper'>
            <MuiOtpInput
              value={props.emailCode}
              onChange={props.handleCodeChange}
              onComplete={props.handleCheckCode}
            />
          </div>
          {!!props.error && (
            <Alert severity='error' className='confirm-email-form__alert'>
              Произошла ошибка! Проверьте введенный код!
            </Alert>
          )}
          <div className='confirm-email-form__send-wrapper'>
            <LoadedButton
              classNames={['confirm-email-form__check-code']}
              label='Готово'
              isLoading={props.isCodeChecking}
              onClick={props.handleCheckCode}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmEmailForm;
