import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Select from '../../../../UI/Select';
import Input from '../../../../UI/Input';
import { IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TextArea from '../../../../UI/TextArea';
import { AddressPicker, GeoController } from '../../../SearchMap';
import { EditAdController } from '../../controllers/edit-ad.controller';
import { useNavigate, useParams } from 'react-router-dom';
import { IUserAddress } from '../../../../interfaces/auth.interfaces';
import FileLoader from '../FileLoader';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import { PhotoPreview } from '../PhotoPreview';
import Spinner from '../../../../UI/Spinner';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { APP_CONSTANTS } from '../../../../constants/app';

interface IEditFormProps {
  classNames?: string[];
  isEditing?: boolean;
}

export const EditForm = (props: IEditFormProps) => {
  const { showError, showSuccess } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const editAd = useAppSelector((state) => state.editAd);
  const app = useAppSelector((state) => state.app);
  const auth = useAppSelector((state) => state.auth);
  const controller = new EditAdController(dispatch, navigate);
  const params = useParams();

  const addresses = [
    ...auth.user.addresses,
    editAd.newAddress ? editAd.newAddress : null,
  ].filter((address) => address !== null) as IUserAddress[];

  useEffect(() => {
    if (!auth.user.isEmailVerified) {
      showError('Для публикации объявлений необходимо подтвердить почту');
      navigate('/profile');
    }
    if (props.isEditing && !!params.id) {
      controller.getPost(params.id);
    }
    return () => {
      controller.clearState();
    };
  }, []);

  const onConfirm = () => {
    if (props.isEditing && !!params.id) {
      controller.onEditAd(params.id);
    } else {
      controller.onCreateAd();
    }
  };

  return (
    <div className={classNamesParser('edit-form', props.classNames)}>
      {editAd.isPostFetching ? (
        <div className='edit-form__loader'>
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className='edit-form__title'>
            {!props.isEditing
              ? 'Разместить новое объявление'
              : 'Редактирование объявления'}
          </h2>
          <p className='edit-form__block-title'>Категория</p>
          <Select
            value={editAd.category}
            placeholder='Выберите категорию'
            options={app.categories.map((category) => ({
              ...category,
              title: `${category.title} ${category.icon}`,
            }))}
            onChange={controller.onCategoryChange}
          />
          <div className='edit-form__block-title'>
            <p>Название</p>
            <p className='edit-form__input-counter'>
              {editAd.title.length} / {APP_CONSTANTS.MAX_TITLE_LENGTH}
            </p>
          </div>
          <Input
            placeholder='Введите название'
            value={editAd.title}
            onInput={controller.onTitleChange}
          />
          <div className='edit-form__block-title'>
            <p>Описание</p>
            <p className='edit-form__input-counter'>
              {editAd.description.length} /{' '}
              {APP_CONSTANTS.MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
          <TextArea
            placeholder='Введите описание'
            value={editAd.description}
            onInput={controller.onDescriptionChange}
            classNames={['edit-form__description']}
          />
          <p className='edit-form__block-title'>Адрес</p>
          <div className='edit-form__address-block'>
            <Select
              placeholder='Выберите адрес'
              classNames={['edit-form__address-select']}
              value={editAd.pickedAddress}
              options={addresses}
              onChange={controller.onAddressChange}
            />
            <IconButton
              className='edit-form__address-picker'
              onClick={controller.openAddressPicker}>
              <MapIcon className='edit-form__map-icon' />
            </IconButton>
          </div>
          <p className='edit-form__block-title'>Фотографии</p>
          <FileLoader
            classNames={['edit-form__file-loader']}
            onLoadFiles={controller.onFileLoad}
          />
          <div className='edit-form__photo-wrapper'>
            {editAd.images.length > 0
              ? editAd.images.map((image, i) => (
                  <PhotoPreview
                    key={i}
                    id={i}
                    classNames={['edit-form__photo-preview']}
                    imagePath={image}
                    onPhotoDelete={controller.onPhotoDelete}
                  />
                ))
              : null}
          </div>

          <div className='edit-form__publish-wrapper'>
            <LoadedButton
              isLoading={editAd.isLoading}
              label={
                props.isEditing ? 'Сохранить объявление' : 'Создать объявление'
              }
              onClick={onConfirm}
              classNames={['edit-form__publish']}
            />
          </div>
          <AddressPicker
            onAddressPick={controller.onPickNewAddress}
            isOpen={editAd.isAddressSearchOpen}
            handleClose={controller.closeAddressPicker}
            onChangeCity={controller.onChangeCity}
          />
        </>
      )}
    </div>
  );
};
