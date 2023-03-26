import React, { CSSProperties } from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';
import { CircularProgress } from '@mui/material';

interface ISpinnerProps {
  classNames?: string[];
  width?: number;
  height?: number;
}

const Spinner = (props: ISpinnerProps) => {
  let styles: CSSProperties = {};

  if (props.width) {
    styles.minWidth = `${props.width}px`;
    styles.maxWidth = `${props.width}px`;
  }

  if (props.height) {
    styles.minHeight = `${props.height}px`;
    styles.maxHeight = `${props.height}px`;
  }

  return (
    <span
      style={styles}
      className={classNamesParser('spinner', props.classNames)}>
      <CircularProgress className='spinner__svg' style={styles} />
    </span>
  );
};

export default Spinner;
