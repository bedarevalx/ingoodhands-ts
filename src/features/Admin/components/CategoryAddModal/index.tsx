import React, { ChangeEvent } from 'react';
import Modal from '../../../../UI/Modal';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import { Switch } from '@mui/material';

interface ICategoryAddModal {
  classNames?: string[];
  isOpen?: boolean;
  isEditing?: boolean;
  isLoading: boolean;
  handleClose?: () => void;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onActivityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  icon: string;
  isActive: boolean;
  onAddCategory: () => void;
  onEditCategory: () => void;
}

const CategoryAddModal = (props: ICategoryAddModal) => {
  const handleConfirm = () => {
    if (props.isEditing) {
      props.onEditCategory();
      props.handleClose && props.handleClose();
    } else {
      props.onAddCategory();
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
          {props.isEditing ? 'Редактировать категорию' : 'Добавить категорию'}
        </h2>
        <Input
          classNames={['category-add-modal__input-title']}
          value={props.title}
          label='Название категории'
          placeholder='Введите название категории'
          onInput={props.onTitleChange}
        />
        <Input
          classNames={['category-add-modal__input-title']}
          value={props.icon}
          label='Иконка'
          placeholder='Введите иконку'
          onInput={props.onIconChange}
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
            isLoading={false}
            onClick={handleConfirm}
            label={props.isEditing ? 'Сохранить' : 'Добавить'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CategoryAddModal;
