import React, { CSSProperties, useRef } from 'react';
import { TextField } from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';
interface IInputProps {
  classNames: string[];
  error?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'text' | 'password';
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  multiline?: boolean;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  variant?: 'standard' | 'outlined';
  size?: 'small' | 'medium';
  onIconClick?: any;
  helperText?: string;
  styles?: CSSProperties;
  stylesContainer?: CSSProperties;
}

const Input = (props: IInputProps) => {
  const ref = useRef<any>(null);
  const variant = props.variant ? props.variant : 'outlined';
  const modifier = `input_${variant}`;

  return (
    <div
      style={props.stylesContainer}
      className={classNamesParser(`input ${modifier}`, props.classNames)}>
      {props.label && <span className='input__label'>{props.label}</span>}
      <div className='input__wrapper'>
        <TextField
          style={props.styles}
          ref={ref}
          multiline={props.multiline}
          disabled={props.disabled}
          className='input__field'
          rows={5}
          type={props.type}
          onInput={props.onInput}
          value={props.value}
          error={!!props.error}
          placeholder={props.placeholder}
          size={props.size || 'small'}
          onKeyDown={props.handleKeyDown}
          variant={props.variant}
        />
      </div>
      {!!props.helperText && !props.error && (
        <span className='helper-text'>{props.helperText}</span>
      )}

      {!!props.error && <span className='error'>{props.error}</span>}
    </div>
  );
};

export default Input;
