import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ICategoriesListProps {
  classNames?: string[];
}

export const CategoriesList = (props: ICategoriesListProps) => {
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
    <div className={classNamesParser('categories-list', props.classNames)}>
      <h3>Управление категориями</h3>
      <div className='categories-list__list'>
        {app.categories.map((category) => (
          <div className='categories-list__category'>
            <div className='categories-list__category-icon-wrapper'>
              {/* <LocationCityIcon className='categories-list__category-icon' /> */}
              <span className='categories-list__category-icon'>
                {category.icon}
              </span>
            </div>
            <div className='categories-list__category-info'>
              <p className='categories-list__category-title'>
                {category.title}
              </p>
              <p className='categories-list__category-activity'>
                {category.isActive ? 'Активен' : 'Не активен'}
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
