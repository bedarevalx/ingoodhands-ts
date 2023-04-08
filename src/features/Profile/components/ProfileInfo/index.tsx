import React, { useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Button from '../../../../UI/Button';
import Modal from '../../../../UI/Modal';
import { ProfileController } from '../../controllers/profile.controller';
import { useNavigate } from 'react-router-dom';
import ConfirmEmailForm from '../ConfirmEmailForm';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Tooltip } from '@mui/material';

interface IProfileInfoProps {
  classNames?: string[];
}

export const ProfileInfo = (props: IProfileInfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile);
  const app = useAppSelector((state) => state.app);
  const cityName = app.cities.find((city) => city.id === user.idCity)?.title;
  const profileController = new ProfileController(dispatch, navigate);

  return (
    <section className={classNamesParser('profile-info', props.classNames)}>
      <h3 className='profile-info__title'>Ваш профиль</h3>
      <div className='profile-info__block'>
        <div className='profile-info__name-block'>
          <p className='profile-info__block-title'>Имя</p>
        </div>
        <p>{user.name}</p>
      </div>
      <div className='profile-info__block'>
        <div className=' profile-info__email-block'>
          <p className='profile-info__block-title'>Электронная почта</p>
          {user.isEmailVerified ? (
            <Tooltip title='Ваша почта подтверждена'>
              <VerifiedIcon className='profile-info__email-verified-icon' />
            </Tooltip>
          ) : (
            // <div>Подтверждена</div>
            <Button
              classNames={['profile-info__confirm-button']}
              onClick={profileController.handleOpenConfirmEmail}>
              Подтвердить
            </Button>
          )}
        </div>
        <p>{user.email}</p>
      </div>

      <div className='profile-info__block'>
        <div className='profile-info__phone-block'>
          <p className='profile-info__block-title'>Номер телефона</p>
        </div>
        <p>{user.phoneNumber}</p>
      </div>

      <div className='profile-info__block'>
        <div className='profile-info__city-block'>
          <p className='profile-info__block-title'>Город</p>
        </div>
        <p>{cityName}</p>
      </div>
      <Modal
        classNames={['profile-info__confirm-modal']}
        handleClose={profileController.handleCloseConfirmEmail}
        open={profile.modalsVisible.isConfirmModalVisible}>
        <ConfirmEmailForm
          handleClose={profileController.handleCloseConfirmEmail}
          handleSendLetter={profileController.handleSendConfirmEmail}
          isEmailSending={profile.loaders.isEmailSending}
          isEmailSended={profile.isConfirmEmailSended}
          isCodeChecking={profile.loaders.isCodeChecking}
          handleCheckCode={profileController.handleCheckCode}
          handleCodeChange={profileController.handleCodeChange}
          email={user.email}
          emailCode={profile.emailCode}
          error={profile.errors.checkCodeError}
        />
      </Modal>
    </section>
  );
};
