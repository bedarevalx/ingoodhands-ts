import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { ModerationController, ModerationMap } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';
import Button from '../../../../UI/Button';

export const ModerationForm = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const moderation = useAppSelector((state) => state.moderation);
  const controller = new ModerationController(dispatch);
  useEffect(() => {
    if (!params.id) {
      navigate('/404');
      return;
    }
    controller.startModeration(params.id);
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
        <img className='moderation-form'></img>
      </div>

      <div className='moderation-form__conclusion'></div>
    </div>
  );
};
