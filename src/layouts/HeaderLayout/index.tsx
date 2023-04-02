import React, { ReactNode } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IHeaderLayoutProps {
  children: ReactNode;
  classNames?: string[];
}

const HeaderLayout = (props: IHeaderLayoutProps) => {
  return (
    <div className='header-layout'>
      <Header classNames={['header-layout__header']} />
      <div
        className={classNamesParser(
          'container header-layout__container',
          props.classNames,
        )}>
        <main className='header-layout__main'>{props.children}</main>
      </div>
      <Footer classNames={['header-layout__footer']} />
    </div>
  );
};

export default HeaderLayout;
