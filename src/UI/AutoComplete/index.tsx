import React, {
  CSSProperties,
  useRef,
  FocusEvent,
  ReactNode,
  useState,
  SyntheticEvent,
  ChangeEvent,
} from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';
import { useErros } from '../../hooks/useErrors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MuiAutoComplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import { IAddress } from '../../interfaces/general.interfaces';
import Input from '../Input';

interface IAutoCompleteProps {
  classNames?: string[];
  items: any[];
  onSelect?: (value: string) => void;
  onClear?: () => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isLoading?: boolean;
  value?: string;
  open?: boolean | null;
  onClose?: () => void;
  placeholder?: string;
  size?: 'small' | 'medium';
  disablePortal?: boolean;
  onEnterPress?: () => void | Promise<void>;
}

const AutoComplete = (props: IAutoCompleteProps) => {
  const onAddressInput = (event: any) => {
    props.onInput && props.onInput(event);
  };

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (reason === 'selectOption') {
      const selectedAddress = props.items.find((item) => item.title === value);
      props.onSelect && props.onSelect(selectedAddress);
    }

    if (reason === 'clear') {
      props.onClear && props.onClear();
    }
  };

  return (
    <div className={classNamesParser(`auto-complete`, props.classNames)}>
      <div className='auto-complete__wrapper'>
        <MuiAutoComplete
          {...(props.open !== undefined ? { open: Boolean(props.open) } : null)}
          className='auto-complete__input'
          results={10}
          disablePortal={props.disablePortal}
          size={props.size || 'small'}
          value={props.value || ''}
          filterOptions={(options) => options}
          freeSolo
          loading={props.isLoading}
          openOnFocus
          onClose={props.onClose}
          options={props.items.map((item, i) => item.title) as string[]}
          renderInput={(params) => (
            <TextField {...params} placeholder={props.placeholder} />
          )}
          onChange={onChange}
          onInput={onAddressInput}
        />
      </div>
    </div>
  );
};

export default AutoComplete;
