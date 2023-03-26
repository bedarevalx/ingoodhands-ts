import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../../features/Auth';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Button from '../../UI/Button';
import ProfileButton from '../ProfileButton';
import { ReactComponent as Logo } from '../../assets/vector/logo.svg';
import HeaderBg from '../../assets/vector/header-bg.svg';

interface IHeaderProps {
  classNames: string[];
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const authService = new AuthService(dispatch);
  return (
    <header
      className='header'
      style={{ backgroundImage: `url('${HeaderBg}')`, backgroundSize: '' }}>
      <div className='container header__container'>
        <Logo className='header__logo' />
        <ProfileButton
          isAuthenticate={auth.isAuthenticate}
          userName={auth.user.name}
          onSignOut={authService.signOut}
        />
      </div>
    </header>
  );
};

export default Header;
