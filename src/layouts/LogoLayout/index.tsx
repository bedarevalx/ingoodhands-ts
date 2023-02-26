import React, { ReactNode } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Logo from '../../assets/vector/logo.svg';
import { ReactComponent as SignUpLogo } from '../../assets/vector/logo.svg';

interface ILogoLayoutProps {
  children: ReactNode;
}

const LogoLayout = (props: ILogoLayoutProps) => {
  return (
    <div className='logo-layout'>
      <div className='container logo-layout__container'>
        <main className='logo-layout__main'>
          <SignUpLogo className='logo-layout__logo' />
          {props.children}
        </main>
      </div>
      <Footer classNames={['logo-layout__footer']} />
    </div>
  );
};

export default LogoLayout;
