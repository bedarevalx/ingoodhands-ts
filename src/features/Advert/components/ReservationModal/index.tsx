import React, { useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import Modal from '../../../../UI/Modal';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';

interface IReservationModalProps {
  handleClose?: () => void;
  handleReserve: (days: number) => void;
  isLoading: boolean;
  isOpen: boolean;
}

export const ReservationModal = (props: IReservationModalProps) => {
  const [days, setDays] = useState(1);

  const handleDaysChange = (_: any, value: number) => {
    setDays(value);
  };

  const handleReserveClick = () => {
    props.handleReserve(days);
  };
  return (
    <Modal
      open={props.isOpen}
      handleClose={props.handleClose}
      classNames={['reservation-modal']}>
      <h2 className='reservation-modal__title'>Забронировать объявление</h2>
      <IconButton
        className='reservation-modal__close-btn'
        onClick={props.handleClose}>
        <CloseIcon className='reservation-modal__close-icon' />
      </IconButton>
      <h3 className='reservation-modal__period-title'>Выберите длительность</h3>
      <ToggleButtonGroup
        exclusive
        onChange={handleDaysChange}
        value={days}
        className='reservation-modal__period-selector'>
        <ToggleButton className='reservation-modal__period-btn' value={1}>
          1 день
        </ToggleButton>
        <ToggleButton className='reservation-modal__period-btn' value={2}>
          2 дня
        </ToggleButton>
        <ToggleButton className='reservation-modal__period-btn' value={3}>
          3 дня
        </ToggleButton>
      </ToggleButtonGroup>
      <p className='reservation-modal__helper'>
        Остчет времени бронирования начнется после его подтверждения владельцем
        объявления
      </p>
      <div className='reservation-modal__reserve-wrapper'>
        <LoadedButton
          onClick={handleReserveClick}
          classNames={['reservation-modal__reserve']}
          isLoading={props.isLoading}
          label='Забронировать'
        />
      </div>
    </Modal>
  );
};
