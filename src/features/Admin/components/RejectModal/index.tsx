import React, { ChangeEvent } from 'react';
import Modal from '../../../../UI/Modal';
import Input from '../../../../UI/Input';
import LoadedButton from '../../../../UI/LoadedButton';

interface IRejectModalProps {
  open: boolean;
  onReject: () => void;
  onClose: () => void;
  isLoading: boolean;
  reason: string;
  onReasonChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const RejectModal = (props: IRejectModalProps) => {
  return (
    <Modal
      handleClose={props.onClose}
      open={props.open}
      classNames={['reject-modal']}>
      <h2 className='reservation-modal__title'>Отклонить публикацию</h2>
      <Input
        value={props.reason}
        onInput={props.onReasonChange}
        placeholder='Подробно опишите причину отказа в публикации'
        multiline
      />
      <div className='reject-modal__reject-wrapper'>
        <LoadedButton
          disabled={props.reason.length === 0}
          onClick={props.onReject}
          isLoading={props.isLoading}
          classNames={['reject-modal__reject']}
          label='Отклонить публикацию'
        />
      </div>
    </Modal>
  );
};
