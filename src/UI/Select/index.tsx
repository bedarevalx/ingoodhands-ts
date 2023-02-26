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

interface ISelectProps {
  classNames: string[];
  value?: string;
  //   options?: IAppSelectItem<string | AdPriceUnitTypes | GenderTypes>[];
  onChange?: (event: SelectChangeEvent) => void;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  open?: boolean;
}

// Не предполагается что компонент динамический
const Select = (props: ISelectProps) => {
  return (
    <div className={classNamesParser('select', props.classNames)}>
      {props.label && <span className='select__label'>{props.label}</span>}
      <MUISelect
        placeholder={props.placeholder}
        disabled={props?.disabled}
        variant={props.variant}
        value={props.value}
        onChange={props.onChange}
        size={props.size || 'small'}
        open={props.open}
        className='select__select'>
        <MenuItem value={0} selected={true}>
          {props.placeholder}
        </MenuItem>
        {/* {props.options?.map((item) => (
          <MenuItem key={item.id} value={item.value}></MenuItem>
        ))} */}
      </MUISelect>
    </div>
  );
};

export default Select;
