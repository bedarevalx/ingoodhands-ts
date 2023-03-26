import React, { ReactNode } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Logo from '../../assets/vector/logo.svg';
import { ReactComponent as SignUpLogo } from '../../assets/vector/logo.svg';
import { useNavigate } from 'react-router-dom';

interface ILogoLayoutProps {
  children: ReactNode;
}

const LogoLayout = (props: ILogoLayoutProps) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <div className='logo-layout'>
      <div className='container logo-layout__container'>
        <main className='logo-layout__main'>
          <SignUpLogo onClick={handleLogoClick} className='logo-layout__logo' />
          {props.children}
        </main>
      </div>
      <Footer classNames={['logo-layout__footer']} />
    </div>
  );
};

export default LogoLayout;
