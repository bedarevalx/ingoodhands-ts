import React, { useEffect, useRef, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { classNamesParser } from '../../helpers/classNamesParser';
import { AuthService } from '../../features/Auth';
import { useAppDispatch } from '../../hooks/useRedux';

interface IProfileButtonProps {
  classNames?: string[];
  isAuthenticate?: boolean;
  userName?: string;
  onSignOut?: () => void;
  isMobile?: boolean;
}

const ProfileButton = (props: IProfileButtonProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState<any>(false);
  const authService = new AuthService(dispatch);

  const onProfileClick = (event: any) => {
    if (props.isAuthenticate) {
      setAnchorEl(event.currentTarget);
      setOpenMenu(true);
    } else {
      navigate(`/sign-up`);
    }
  };

  const onMenuClose = () => setOpenMenu(false);

  const onSignIn = () => navigate('/sign-in');

  const handleMyAds = () => {
    onMenuClose();
    navigate('/user-ads', {
      state: {},
    });
  };

  const handleMessages = () => {
    onMenuClose();
    navigate('/messages', {
      state: {},
    });
  };

  const handleFavorites = () => {
    onMenuClose();
    navigate('/favorites', {
      state: {},
    });
  };

  const handleProfile = () => {
    onMenuClose();
    navigate('/profile-settings', {
      state: {},
    });
  };

  const handleSignOut = () => {
    onMenuClose();
    props.onSignOut && props.onSignOut();
  };

  return (
    <div
      className={classNamesParser('profile-button', [
        ...(props.classNames || []),
        props.isMobile ? 'profile-button_mobile' : '',
      ])}>
      {props.isMobile ? (
        <PersonOutlineIcon
          onClick={onProfileClick}
          className='profile-button__mobile-icon'
        />
      ) : (
        <Button
          onClick={onProfileClick}
          className='button profile-button__button'
          startIcon={
            <PersonOutlineIcon className='profile-button__button-icon' />
          }>
          {props.isAuthenticate && props.userName ? props.userName : 'Войти'}
        </Button>
      )}
      <Menu
        className='profile-button__menu'
        anchorEl={anchorEl}
        open={openMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={onMenuClose}>
        {props.isAuthenticate && (
          <div>
            <MenuItem
              className='profile-button__menu-item'
              onClick={handleProfile}>
              <SettingsOutlinedIcon className='profile-button__item-icon' />
              {'Мой профиль'}
            </MenuItem>
            <MenuItem
              className='profile-button__menu-item'
              onClick={handleMyAds}>
              <ListAltOutlinedIcon className='profile-button__item-icon' />
              {'Мои объявления'}
            </MenuItem>
            <MenuItem
              className='profile-button__menu-item'
              onClick={handleFavorites}>
              <GradeOutlinedIcon className='profile-button__item-icon' />
              {'Избранное'}
            </MenuItem>
          </div>
        )}
        <Button
          onClick={props.isAuthenticate ? handleSignOut : onSignIn}
          className='button button_square profile-button__sign-out'
          variant='contained'
          disableElevation>
          {props.isAuthenticate ? 'Выйти' : 'Войти'}
        </Button>
      </Menu>
    </div>
  );
};

export default ProfileButton;
