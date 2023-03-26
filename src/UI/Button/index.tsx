import { Button as MUIButton } from '@mui/material';
import React, { ReactNode } from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IButtonProps {
  classNames?: string[];
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
}
const Button = (props: IButtonProps) => {
  return (
    <MUIButton
      className={classNamesParser('button', props.classNames)}
      onClick={props.onClick}>
      {props.label}
      {props.children ? props.children : null}
    </MUIButton>
  );
};

export default Button;
