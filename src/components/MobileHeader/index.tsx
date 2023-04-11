import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../features/Auth';
import ProfileButton from '../ProfileButton';
import Button from '../../UI/Button';
import { ReactComponent as Logo } from '../../assets/vector/logo-mobile.svg';
import { IconButton } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';

interface IMobileHeaderProps {
  classNames?: string[];
}

export const MobileHeader = (props: IMobileHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const authService = new AuthService(dispatch);
  const handlePlaceAdClick = () => {
    navigate('/new-ad');
  };

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <header
      className='header-mobile'
      // style={{ backgroundImage: `url('${HeaderBg}')`, backgroundSize: '' }}
    >
      <div className='container header-mobile__container'>
        <IconButton
          className={'header-mobile__menu-btn'}
          onClick={handlePlaceAdClick}>
          <AppsIcon className='header-mobile__menu-icon' />
        </IconButton>
        <Logo className='header-mobile__logo' onClick={handleLogoClick} />

        <ProfileButton
          classNames={['header-mobile__profile-button']}
          isAuthenticate={auth.isAuthenticate}
          userName={auth.user.name}
          onSignOut={authService.signOut}
          isMobile={true}
        />
      </div>
    </header>
  );
};
