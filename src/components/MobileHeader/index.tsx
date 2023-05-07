import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Link, useNavigate } from 'react-router-dom';
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
import CloseIcon from '@mui/icons-material/Close';

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

  const handleLinkClick = (to: string) => {
    navigate('/' + to);
    handleCloseDrawer();
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
        <Link to={'/'}>
          <Logo className='header-mobile__logo' onClick={handleLogoClick} />
        </Link>
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
          <IconButton
            className='header-mobile__navigation-close'
            onClick={handleCloseDrawer}>
            <CloseIcon className='header-mobile__close-icon' />
          </IconButton>
          <ul className='header-mobile__links'>
            {(props.menuType === 'profile'
              ? ProfileMenuMocks
              : AdminMenuMocks
            ).map((menu) => (
              <RequiredRole role={menu.role} key={menu.id}>
                <li className='header-mobile__link-wrapper'>
                  <Button
                    classNames={['header-mobile__link']}
                    onClick={() => handleLinkClick(menu.value)}>
                    {menu.text}
                  </Button>
                </li>
              </RequiredRole>
            ))}
          </ul>
          {props.menuType === 'profile' && (
            <div className='header-mobile__place-ad-wrapper'>
              <Button
                classNames={['header-mobile__place-ad']}
                onClick={() => handleLinkClick('new-ad')}>
                Разместить объявление
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
};
