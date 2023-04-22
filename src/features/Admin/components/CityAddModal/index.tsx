import React, { ChangeEvent } from 'react';
import { ICity } from '../../../../interfaces/general.interfaces';
import Modal from '../../../../UI/Modal';
import Input from '../../../../UI/Input';
import { Switch } from '@mui/material';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';

interface ICityAddModal {
  classNames?: string[];
  isOpen?: boolean;
  isEditing?: boolean;
  isLoading: boolean;
  handleClose?: () => void;
  onAddCity: () => void;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onActivityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  isActive: boolean;
  onEditCity: () => void;
}

const CityAddModal = (props: ICityAddModal) => {
  const handleConfirm = () => {
    if (props.isEditing) {
      props.onEditCity();
      props.handleClose && props.handleClose();
    } else {
      props.onAddCity();
      props.handleClose && props.handleClose();
    }
  };
  return (
    <Modal
      open={props.isOpen}
      classNames={props.classNames}
      handleClose={props.handleClose}>
      <div className='category-add-modal'>
        <h2 className='category-add-modal__title'>
          {props.isEditing ? 'Редактировать город' : 'Добавить город'}
        </h2>
        <Input
          classNames={['category-add-modal__input-title']}
          value={props.title}
          label='Название города'
          placeholder='Введите название города'
          onInput={props.onTitleChange}
        />
        <p className='input__label'>Активность</p>
        <Switch checked={props.isActive} onChange={props.onActivityChange} />
        <div className='category-add-modal__buttons-wrapper'>
          <Button
            classNames={['category-add-modal__cancel-btn']}
            onClick={props.handleClose}>
            Отменить
          </Button>
          <LoadedButton
            classNames={['category-add-modal__confirm-btn']}
            isLoading={props.isLoading}
            onClick={handleConfirm}
            label={props.isEditing ? 'Сохранить' : 'Добавить'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CityAddModal;
