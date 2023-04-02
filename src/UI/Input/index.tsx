import React, {
  CSSProperties,
  useRef,
  FocusEvent,
  ReactNode,
  useState,
} from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';
import { useErros } from '../../hooks/useErrors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface IInputProps {
  classNames?: string[];
  error?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

const Input = (props: IInputProps) => {
  const e = useErros();
  const ref = useRef<any>(null);
  const variant = props.variant ? props.variant : 'outlined';
  const modifier = `input_${variant}`;
  const type = props.type ? `input__${props.type}` : '';
  const [visibility, setVisibility] = useState(
    props.type === 'password' ? false : true,
  );

  return (
    <div
      style={props.stylesContainer}
      className={classNamesParser(
        `input ${modifier} ${type}`,
        props.classNames,
      )}>
      {props.label && <span className='input__label'>{props.label}</span>}
      <div className='input__wrapper'>
        <TextField
          style={props.styles}
          ref={ref}
          multiline={props.multiline}
          disabled={props.disabled}
          className='input__field'
          rows={5}
          type={visibility ? 'text' : props.type}
          onInput={props.onInput}
          value={props.value}
          error={!!props.error}
          placeholder={props.placeholder}
          size={props.size || 'small'}
          onKeyDown={props.handleKeyDown}
          variant={props.variant}
          onBlur={props.onBlur}
          InputProps={{
            endAdornment:
              props.type === 'password' ? (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setVisibility((prev) => !prev)}>
                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      </div>
      {props.children ? props.children : null}
      {!!props.helperText && !props.error && (
        <span className='helper-text'>{props.helperText}</span>
      )}

      {!!props.error && <span className='input__error'>{e(props.error)}</span>}
    </div>
  );
};

export default Input;
