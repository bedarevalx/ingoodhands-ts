import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';

interface ITextAreaProps {
  value: string;
  onInput?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  classNames?: string[];
  error?: string;
  helperText?: string;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
}

const TextArea = (props: ITextAreaProps) => {
  return (
    <div className={classNamesParser('textarea', props.classNames)}>
      <textarea
        className='textarea__input'
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onInput}
      />
    </div>
  );
};

export default TextArea;
