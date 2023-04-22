import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Spinner from '../../../../UI/Spinner';
import { useDispatch } from 'react-redux';
import { DictionariesController } from '../..';
import Button from '../../../../UI/Button';
import { ICity } from '../../../../interfaces/general.interfaces';
import CityAddModal from '../CityAddModal';

interface ICitiesListProps {
  classNames?: string[];
}

export const CitiesList = (props: ICitiesListProps) => {
  const dispatch = useDispatch();
  const cities = useAppSelector((state) => state.cities);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const controller = new DictionariesController(dispatch);
  const isMenuOpened = Boolean(anchorEl);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    city: ICity,
  ) => {
    setAnchorEl(event.currentTarget);
    controller.setMenuToCity(city);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    controller.handleCityEdit();
    handleMenuClose();
  };

  const handleDelete = () => {
    controller.handleCityDelete();
    handleMenuClose();
  };

  useEffect(() => {
    if (cities.cities.length === 0) controller.getAllCities();
  }, []);

  return (
    <div className={classNamesParser('cities-list', props.classNames)}>
      <div className='cities-list__header'>
        <h3>Управление городами</h3>

        <Button
          onClick={controller.handleCityAdd}
          classNames={['categories-list__button-add']}>
          Добавить
        </Button>
      </div>
      <div className='cities-list__list'>
        {cities.isFetching ? <Spinner /> : null}
        {cities.cities.map((city) => (
          <div className='cities-list__city' key={city.id}>
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
              onClick={(e) => handleMenuOpen(e, city)}>
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
      <CityAddModal
        title={cities.title}
        isActive={cities.isActive}
        isEditing={cities.isEditing}
        isLoading={cities.isLoading}
        isOpen={cities.isModalVisible}
        onActivityChange={controller.handleCityActivityChange}
        onTitleChange={controller.handleCityTitleChange}
        onAddCity={controller.onAddNewCity}
        onEditCity={controller.onEditCity}
        handleClose={controller.handleCityModalClose}
      />
    </div>
  );
};
