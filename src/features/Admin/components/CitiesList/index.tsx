import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ICitiesListProps {
  classNames?: string[];
}

export const CitiesList = (props: ICitiesListProps) => {
  const app = useAppSelector((state) => state.app);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpened = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleEdit();
  };

  const handleDelete = () => {
    handleMenuClose();
  };

  return (
    <div className={classNamesParser('cities-list', props.classNames)}>
      <h3>Управление городами</h3>
      <div className='cities-list__list'>
        {app.cities.map((city) => (
          <div className='cities-list__city'>
            <div className='cities-list__city-icon-wrapper'>
              <LocationCityIcon className='cities-list__city-icon' />
            </div>
            <div className='cities-list__city-info'>
              <p className='cities-list__city-title'>{city.title}</p>
              <p className='cities-list__city-activity'>
                {city.isActive ? 'Активен' : 'Не активен'}
              </p>
            </div>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={isMenuOpened ? 'long-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};
