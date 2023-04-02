import React from 'react';
import {
  MenuItem,
  Select as MUISelect,
  SelectChangeEvent,
} from '@mui/material';
import { classNamesParser } from '../../helpers/classNamesParser';
// import { IAppSelectItem } from '../../interfaces/appSelect.interfaces';
// import { AdPriceUnitTypes } from '../../types/ad.types';
// import { useTranslation } from 'react-i18next';
import { GenderTypes } from '../../types/general.types';
import {
  IAppSelectItem,
  ICategory,
  ICity,
} from '../../interfaces/general.interfaces';
import { useErros } from '../../hooks/useErrors';
import { IUserAddress } from '../../interfaces/auth.interfaces';

interface ISelectProps {
  classNames?: string[];
  value?: string;
  options?: IAppSelectItem<string | ICity | ICategory | IUserAddress>[];
  onChange?: (event: SelectChangeEvent) => void;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  open?: boolean;
  error?: string;
  helperText?: string;
}

// Не предполагается что компонент динамический
const Select = (props: ISelectProps) => {
  const e = useErros();

  return (
    <div className={classNamesParser('select', props.classNames)}>
      {props.label && <span className='select__label'>{props.label}</span>}
      <MUISelect
        error={!!props.error}
        placeholder={props.placeholder}
        disabled={props?.disabled}
        variant={props.variant}
        value={props.value}
        onChange={props.onChange}
        size={props.size || 'small'}
        open={props.open}
        className={`select__select ${props?.value === '-1' && 'placeholder'}`}>
        <MenuItem value={'-1'} selected disabled>
          {props.placeholder}
        </MenuItem>
        {props.options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MUISelect>
      {!!props.helperText && !props.error && (
        <span className='helper-text'>{props.helperText}</span>
      )}

      {!!props.error && <span className='input__error'>{e(props.error)}</span>}
    </div>
  );
};

export default Select;
