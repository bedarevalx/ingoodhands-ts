import { Button as MUIButton } from '@mui/material';
import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IButtonProps {
  classNames: string[];
  label: string;
}
const Button = (props: IButtonProps) => {
  return (
    <MUIButton className={classNamesParser('button', props.classNames)}>
      {props.label}
    </MUIButton>
  );
};

export default Button;
