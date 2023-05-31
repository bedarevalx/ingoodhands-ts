import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserPrivilegeTypes } from '../../../../types/general.types';
import { getLocaleUserRole } from '../../../../helpers/getLocaleUserRole';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface IUserSearchItemProps {
  id: number;
  classNames?: string[];
  email: string;
  name: string;
  phoneNumber: string;
  city: string;
  rating: number;
  createdAt: string;
  isBanned: boolean;
  roles: UserPrivilegeTypes[];
  onBanUser: (id: number) => void;
  onUnbanUser: (id: number) => void;
  onSetRole: (id: number, role: UserPrivilegeTypes) => void;
}
export const UserSearchItem = (props: IUserSearchItemProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBan = () => {
    props.onBanUser && props.onBanUser(props.id);
  };

  const handleSetUser = () => {
    props.onSetRole && props.onSetRole(props.id, 'user');
  };

  const handleSetAdmin = () => {
    props.onSetRole && props.onSetRole(props.id, 'admin');
  };
  const handleSetModerator = () => {
    props.onSetRole && props.onSetRole(props.id, 'moderator');
  };

  const handleUnban = () => {
    props.onUnbanUser && props.onUnbanUser(props.id);
  };

  const getUserRoleKey = () => {
    if (props.roles.length === 0) return '';
    else
      return getLocaleUserRole(
        props.roles.length === 2 ? 'admin' : 'moderator',
      );
  };
  return (
    <div className='user-search-item'>
      <div className='user-search-item__image-container'>
        <AccountCircleOutlinedIcon className='user-search-item__image' />
        {props.isBanned && (
          <LockOutlinedIcon className='user-search-item__banned-icon' />
        )}
      </div>
      <div className='user-search-item__info'>
        <h4 className='user-search-item__email'>{props.email}</h4>
        <p className='user-search-item__phone-number'>{props.phoneNumber}</p>
        <p className='user-search-item__city'>{props.city}</p>
        <p className='user-search-item__role'>{getUserRoleKey()}</p>
        <p className='user-search-item__date'>{props.createdAt}</p>
      </div>
      <IconButton
        className='user-search-item__more-btn'
        onClick={handleMenuOpen}>
        <MoreVertIcon className='user-search-item__more-icon' />
      </IconButton>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {props.isBanned ? (
          <MenuItem onClick={handleUnban}>Разблокировать</MenuItem>
        ) : (
          <MenuItem onClick={handleBan}>Заблокировать</MenuItem>
        )}
        <MenuItem onClick={handleSetUser}>Сделать пользователем</MenuItem>
        <MenuItem onClick={handleSetModerator}>Сделать модератором</MenuItem>
        <MenuItem onClick={handleSetAdmin}>Сделать администратором</MenuItem>
      </Menu>
    </div>
  );
};
