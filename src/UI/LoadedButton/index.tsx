import { Button as MUIButton } from '@mui/material';
import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';
import Spinner from '../Spinner';

interface ILoadedButtonProps {
  classNames?: string[];
  label: string;
  isLoading: boolean;
  onClick?: () => void;
  variant?: 'outlined' | 'contained' | 'text';
  disabled?: boolean;
}
const LoadedButton = (props: ILoadedButtonProps) => {
  return (
    <MUIButton
      disabled={props.isLoading || props.disabled}
      onClick={props.onClick}
      variant={props.variant || 'outlined'}
      className={classNamesParser('button loaded-button', props.classNames)}>
      {props.label}
      {props.isLoading ? (
        <Spinner
          width={24}
          height={24}
          classNames={['loaded-button__spinner']}
        />
      ) : null}
    </MUIButton>
  );
};

export default LoadedButton;
