import React from 'react';
import { Box, Modal as MuiModal } from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IModalProps {
  classNames?: string[];
  children?: JSX.Element | JSX.Element[] | any;
  handleClose?: () => void;
  open?: boolean;
}

const Modal = (props: IModalProps) => {
  return (
    <MuiModal
      open={!!props.open}
      onClose={props.handleClose}
      className={classNamesParser('modal', props.classNames)}>
      <Box className='modal__container' children={props.children} />
    </MuiModal>
  );
};

export default Modal;
