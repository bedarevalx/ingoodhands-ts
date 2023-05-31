import { IconButton } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Delete } from '@mui/icons-material';
import { IUserAddress } from '../../../../interfaces/auth.interfaces';
import NotFoundItems from '../../../../components/NotFoundItems';

interface IAddressListProps {
  handleClose?: () => void;
  handleDeleteAddress: (id: string) => void;
  addresses: IUserAddress[];
}

export const AddressList = (props: IAddressListProps) => {
  const handleDeleteAddress = () => {
    handleDeleteAddress();
  };
  return (
    <div className='address-list'>
      <div className='address-list__header'>
        <h2 className='address-list__title'>Мои адреса</h2>
        <IconButton
          className='address-list__close-btn'
          onClick={props.handleClose}>
          <CloseIcon className='address-list__close-icon' />
        </IconButton>
      </div>
      {props.addresses.length === 0 && (
        <NotFoundItems
          icon='😞'
          text='У вас нет сохраненных адресов'
          hepler='Сохранить адрес можно при создании объявления'
        />
      )}
      <div className='address-list__list'>
        {props.addresses.map((address) => {
          const onDelete = () => {
            props.handleDeleteAddress(address.id);
          };
          return (
            <div className='address-list__item'>
              <p>{address.title}</p>
              <IconButton onClick={onDelete}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};
