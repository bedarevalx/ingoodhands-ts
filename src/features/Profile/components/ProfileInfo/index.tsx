import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Button from '../../../../UI/Button';
import Modal from '../../../../UI/Modal';
import { ProfileController } from '../../controllers/profile.controller';
import { useNavigate } from 'react-router-dom';
import ConfirmEmailForm from '../ConfirmEmailForm';
import VerifiedIcon from '@mui/icons-material/Verified';
import { IconButton, Rating, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../../../../UI/Input';
import LoadedButton from '../../../../UI/LoadedButton';
import Select from '../../../../UI/Select';
import MaskedInput from '../../../../UI/MaskedInput';
import InfoIcon from '@mui/icons-material/Info';
import { AddressList } from '../AddressList';
interface IProfileInfoProps {
  classNames?: string[];
}

export const ProfileInfo = (props: IProfileInfoProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile);
  const app = useAppSelector((state) => state.app);
  const profileController = new ProfileController(dispatch, navigate);

  useEffect(() => {
    profileController.updateProfile();
  }, []);

  return (
    <section className={classNamesParser('profile-info', props.classNames)}>
      <div className='profile-info__header'>
        <h3 className='profile-info__title'>Мой профиль</h3>
      </div>
      <div
        className={`profile-info__block ${
          profile.isEditing ? ' profile-info__block-editing' : ''
        }`}>
        <div className={'profile-info__name-block'}>
          <p className='profile-info__block-title'>Имя</p>
        </div>
        <div className='profile-info__block-content'>
          {!profile.isEditing ? (
            <>
              <p>{user.name}</p>
              <IconButton
                className='profile-info__edit-btn'
                onClick={profileController.handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          ) : (
            <Input
              value={profile.nameInput}
              variant='standard'
              onInput={profileController.handleNameChange}
              classNames={['profile-info__edit-input']}
            />
          )}
        </div>
      </div>
      <div
        className={`profile-info__block ${
          profile.isEditing ? ' profile-info__block-editing' : ''
        }`}>
        <div className=' profile-info__email-block'>
          <p className='profile-info__block-title'>
            Электронная почта
            {user.isEmailVerified && (
              <Tooltip title='Ваша почта подтверждена'>
                <VerifiedIcon className='profile-info__email-verified-icon' />
              </Tooltip>
            )}
          </p>

          {!user.isEmailVerified && (
            <Button
              classNames={['profile-info__confirm-button']}
              onClick={profileController.handleOpenConfirmEmail}>
              Подтвердить
            </Button>
          )}
        </div>
        <div className='profile-info__block-content'>
          {!profile.isEditing ? (
            <>
              <p>{user.email}</p>
              <IconButton
                className='profile-info__edit-btn'
                onClick={profileController.handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          ) : (
            <Input
              variant='standard'
              value={profile.emailInput}
              onInput={profileController.handleEmailChange}
              classNames={['profile-info__edit-input']}
            />
          )}
        </div>
      </div>

      <div
        className={`profile-info__block ${
          profile.isEditing ? ' profile-info__block-editing' : ''
        }`}>
        <div className='profile-info__phone-block'>
          <p className='profile-info__block-title'>Номер телефона</p>
        </div>
        <div className='profile-info__block-content'>
          {!profile.isEditing ? (
            <>
              <p>{user.phoneNumber}</p>
              <IconButton
                className='profile-info__edit-btn'
                onClick={profileController.handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          ) : (
            <MaskedInput
              mask='+7 (999) 999-9999'
              variant='standard'
              value={profile.phoneInput}
              onInput={profileController.handlePhoneChange}
              classNames={['profile-info__edit-input']}
            />
          )}
        </div>
      </div>

      <div
        className={`profile-info__block ${
          profile.isEditing ? ' profile-info__block-editing' : ''
        }`}>
        <div className='profile-info__city-block'>
          <p className='profile-info__block-title'>Город</p>
        </div>
        <div className='profile-info__block-content'>
          {!profile.isEditing ? (
            <>
              <p>{user.city.name}</p>
              <IconButton
                className='profile-info__edit-btn'
                onClick={profileController.handleEdit}>
                <EditIcon />
              </IconButton>
            </>
          ) : (
            <Select
              variant='standard'
              options={app.cities}
              value={profile.citySelect}
              onChange={profileController.handleCityChange}
              placeholder='Выберите город'
              classNames={['profile-info__edit-input']}
            />
          )}
        </div>
      </div>
      <div className='profile-info__block'>
        <div className='profile-info__balance-block'>
          <p className='profile-info__block-title'>
            Баллы{' '}
            <Tooltip
              enterTouchDelay={0}
              title={
                'Баллы используются для получения контактов пользователя, разместившего объявление. Для того, чтобы получить баллы, необходимо разместить объявление и подтвердить передачу вещей другому пользователю'
              }>
              <InfoIcon className='profile-info__info-icon' />
            </Tooltip>
          </p>
        </div>
        <div className='profile-info__block-content'>
          <p>Кол-во баллов: {user.balance}</p>
        </div>
      </div>
      <div className='profile-info__block'>
        <div className='profile-info__balance-block'>
          <p className='profile-info__block-title'>Рейтинг</p>
        </div>
        <div className='profile-info__block-content'>
          <Rating max={5} precision={0.1} value={user.rating} readOnly />
          <p>Ваш рейтинг: {user.rating.toFixed(2)}</p>
        </div>
      </div>
      <div className='profile-info__block'>
        <Button
          classNames={['profile-info__addresses-btn']}
          onClick={profileController.openAddressModal}>
          Мои адреса
        </Button>
      </div>
      {profile.isEditing && (
        <div className='profile-info__edit-buttons'>
          <Button onClick={profileController.handleEdit}>Отменить</Button>
          <LoadedButton
            label='Сохранить'
            isLoading={profile.loaders.isEditSending}
            onClick={profileController.handleSave}
          />
        </div>
      )}

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
      <Modal
        classNames={['profile-info__confirm-modal']}
        handleClose={profileController.closeAddressModal}
        open={profile.modalsVisible.isAddressesModalOpened}>
        <AddressList
          handleClose={profileController.closeAddressModal}
          addresses={user.addresses}
          handleDeleteAddress={profileController.onDeleteAddress}
        />
      </Modal>
    </section>
  );
};
