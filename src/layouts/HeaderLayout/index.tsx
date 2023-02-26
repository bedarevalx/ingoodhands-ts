import React, { ReactNode } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

interface IHeaderLayoutProps {
  children: ReactNode;
}

const HeaderLayout = (props: IHeaderLayoutProps) => {
  return (
    <div className='header-layout'>
      <Header classNames={['header-layout__header']} />
      <main className='header-layout__main'>{props.children}</main>
      <Footer classNames={['header-layout__footer']} />
    </div>
  );
};

export default HeaderLayout;
