import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { classNamesParser } from '../../helpers/classNamesParser';
import { AuthService } from '../../features/Auth';
import { useAppDispatch } from '../../hooks/useRedux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RequiredRole from '../../hoc/RequiredRole';
import BuildIcon from '@mui/icons-material/Build';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { MEDIA } from '../../constants/app';

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
  const matchSm = useMediaQuery(`(max-width:${MEDIA.SM}px`);
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
    navigate('/profile/my-ads', {
      state: {},
    });
  };

  const handleFavorites = () => {
    onMenuClose();
    navigate('/profile/favorites', {
      state: {},
    });
  };

  const handleReviews = () => {
    onMenuClose();
    navigate('/profile/reviews', {
      state: {},
    });
  };

  const handleProfile = () => {
    onMenuClose();
    navigate('/profile', {
      state: {},
    });
  };

  const handleReservations = () => {
    onMenuClose();
    navigate('/profile/reservations', {
      state: {},
    });
  };
  const handleDeals = () => {
    onMenuClose();
    navigate('/profile/deals', {
      state: {},
    });
  };

  const handleAdminPanel = () => {
    onMenuClose();
    navigate('/admin', {
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
          <span>
            {props.isAuthenticate && props.userName ? props.userName : 'Войти'}
          </span>
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
            {!matchSm && (
              <>
                <MenuItem
                  className='profile-button__menu-item'
                  onClick={handleMyAds}>
                  <ListAltOutlinedIcon className='profile-button__item-icon' />
                  {'Мои объявления'}
                </MenuItem>
                <MenuItem
                  className='profile-button__menu-item'
                  onClick={handleFavorites}>
                  <FavoriteBorderIcon className='profile-button__item-icon' />
                  {'Избранное'}
                </MenuItem>{' '}
                <MenuItem
                  className='profile-button__menu-item'
                  onClick={handleReviews}>
                  <GradeOutlinedIcon className='profile-button__item-icon' />
                  {'Мои отзывы'}
                </MenuItem>
                <MenuItem
                  className='profile-button__menu-item'
                  onClick={handleReservations}>
                  <EventAvailableIcon className='profile-button__item-icon' />
                  {'Бронирования'}
                </MenuItem>
                <MenuItem
                  className='profile-button__menu-item'
                  onClick={handleDeals}>
                  <Inventory2OutlinedIcon className='profile-button__item-icon' />
                  {'Сделки'}
                </MenuItem>
              </>
            )}

            <RequiredRole role='moderator'>
              <MenuItem
                className='profile-button__menu-item'
                onClick={handleAdminPanel}>
                <BuildIcon className='profile-button__item-icon' />
                {'Админ панель'}
              </MenuItem>
            </RequiredRole>
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
