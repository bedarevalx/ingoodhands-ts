import React, { CSSProperties, useRef } from 'react';
import { TextField } from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';
import { useErros } from '../../hooks/useErrors';
import ReactInputMask from 'react-input-mask';
interface IInputProps {
  classNames: string[];
  error?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'text' | 'password' | 'number';
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
  mask: string;
}

const MaskedInput = (props: IInputProps) => {
  const e = useErros();
  const ref = useRef<any>(null);
  const variant = props.variant ? props.variant : 'outlined';
  const modifier = `input_${variant}`;

  return (
    <div
      style={props.stylesContainer}
      className={classNamesParser(`input ${modifier}`, props.classNames)}>
      {props.label && <span className='input__label'>{props.label}</span>}
      <div className='input__wrapper'>
        <ReactInputMask
          mask={props.mask}
          maskChar=''
          value={props.value}
          disabled={props.disabled}
          onBlur={props.onBlur}
          onChange={props.onInput}>
          {() => (
            <TextField
              style={props.styles}
              ref={ref}
              multiline={props.multiline}
              disabled={props.disabled}
              className='input__field'
              rows={5}
              type={props.type}
              error={!!props.error}
              placeholder={props.placeholder}
              size={props.size || 'small'}
              onKeyDown={props.handleKeyDown}
              variant={props.variant}>
              {!!props.mask ? null : null}
            </TextField>
          )}
        </ReactInputMask>
      </div>
      {!!props.helperText && !props.error && (
        <span className='helper-text'>{props.helperText}</span>
      )}

      {!!props.error && <span className='input__error'>{e(props.error)}</span>}
    </div>
  );
};

export default MaskedInput;
