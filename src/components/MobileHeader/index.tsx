import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../features/Auth';
import ProfileButton from '../ProfileButton';
import Button from '../../UI/Button';
import { ReactComponent as Logo } from '../../assets/vector/logo-mobile.svg';
import { Drawer, IconButton } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { classNamesParser } from '../../helpers/classNamesParser';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';
import { AdminMenuMocks } from '../../mocks/admin-menu.mocks';
import RequiredRole from '../../hoc/RequiredRole';

interface IMobileHeaderProps {
  classNames?: string[];
  menuType?: 'profile' | 'admin-panel';
}

export const MobileHeader = (props: IMobileHeaderProps) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
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

  const handleOpenDrawer = () => {
    setIsDrawerOpened(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpened(false);
  };
  return (
    <header
      className={classNamesParser('header-mobile', props.classNames)}
      // style={{ backgroundImage: `url('${HeaderBg}')`, backgroundSize: '' }}
    >
      <div className='container header-mobile__container'>
        <IconButton
          className={'header-mobile__menu-btn'}
          onClick={handleOpenDrawer}>
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
      <Drawer
        className='header-mobile__navigation'
        anchor={'left'}
        open={isDrawerOpened}
        onClose={handleCloseDrawer}>
        <div className='header-mobile__navigation-content'>
          <ul className='hedare-mobile__links'>
            {(props.menuType === 'profile'
              ? ProfileMenuMocks
              : AdminMenuMocks
            ).map((menu) => (
              <RequiredRole role={menu.role}>
                <li className='header-mobile__link'>{menu.text}</li>
              </RequiredRole>
            ))}
          </ul>
        </div>
      </Drawer>
    </header>
  );
};
