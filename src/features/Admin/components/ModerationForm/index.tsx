import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { ModerationController, ModerationMap, RejectModal } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import { IconButton } from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBackIos';

export const ModerationForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const moderation = useAppSelector((state) => state.moderation);
  const controller = new ModerationController(dispatch, navigate);
  useEffect(() => {
    if (!params.id) {
      navigate('/404');
      return;
    }
    controller.startModeration(params.id);

    return () => {
      controller.clearState();
    };
  }, []);

  return moderation.isLoading ? (
    <FullscreenSpinner />
  ) : (
    <div className='moderation-form'>
      <h3 className='moderation-form__title'>Модерация объявления</h3>
      <Button
        classNames={['moderation-form__cancel-btn']}
        onClick={controller.onCancelModeration}>
        Отменить проверку
      </Button>
      <IconButton
        onClick={controller.onCancelModeration}
        className='moderation-form__cancel-btn-mobile'>
        <BackIcon className='moderation-form__back-icon' />
      </IconButton>

      <div className='moderation-form__block'>
        <h4 className='moderation-form__block-header'>Заголовок и описание</h4>
        <h3 className='moderation-form__header'>{moderation.title}</h3>
        <p className='moderation-form__description'>{moderation.description}</p>
      </div>
      <div className='moderation-form__block'>
        <h4 className='moderation-form__block-header'>Категория</h4>
        <p className='moderation-form__category'>
          {moderation.category} {moderation.categoryIcon}
        </p>
      </div>
      <div className='moderation-form__block'>
        <h4 className='moderation-form__block-header'>Город</h4>
        <p className='moderation-form__category'>{moderation.city}</p>
      </div>

      <div className='moderation-form__block'>
        <h4 className='moderation-form__block-header'>Адрес</h4>
        <ModerationMap
          placeName={moderation.address?.title}
          latitude={moderation.address?.latitude}
          longitude={moderation.address?.longitude}
        />
      </div>
      <div className='moderation-form__block'>
        <h4 className='moderation-form__block-header'>Фотографии</h4>
        {moderation.imageSet.map((image) => (
          <img
            className='moderation-form__image'
            src={image}
            alt='moderation'
          />
        ))}
      </div>

      <div className='moderation-form__conclusion'>
        <LoadedButton
          onClick={controller.showRejectModal}
          classNames={['moderation-form__reject']}
          label='Отклонить'
          isLoading={moderation.isRejecting}
        />
        <LoadedButton
          onClick={controller.onPublish}
          classNames={['moderation-form__publish']}
          label='Опубликовать'
          isLoading={moderation.isPublishing}
        />
      </div>
      <RejectModal
        isLoading={moderation.isRejecting}
        open={moderation.isRejectModalOpened}
        onClose={controller.hideRejectModal}
        onReject={controller.onReject}
        onReasonChange={controller.onReasonChange}
        reason={moderation.reason}
      />
    </div>
  );
};
