import React from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IFooterProps {
  classNames: string[];
}

const Footer = (props: IFooterProps) => {
  return (
    <footer className={classNamesParser('footer', props.classNames)}>
      {' '}
      Footer In Good Hands
    </footer>
  );
};

export default Footer;
