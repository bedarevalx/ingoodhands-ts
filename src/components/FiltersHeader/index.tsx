import React, { useEffect, useState } from 'react';
import { classNamesParser } from '../../helpers/classNamesParser';
import Select from '../../UI/Select';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useAppSelector } from '../../hooks/useRedux';
import CategoryItem from '../CategoryItem';
import { AdsController } from '../../features/AdvertList/controllers/ads.controller';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
interface IFiltersHeaderProps {
  classNames?: string[];
}

const FiltersHeader = (props: IFiltersHeaderProps) => {
  const dispatch = useDispatch();
  const app = useAppSelector((state) => state.app);
  const ads = useAppSelector((state) => state.ads);
  const controller = new AdsController(dispatch);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { scrollDirection, scrollPosition, isScrollPositive } =
    useScrollDirection();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const onDateParamClick = () => {
    controller.handleSortByChange('date', 'дате публикации');
    handleMenuClose();
  };

  const onViewCountParamClick = () => {
    controller.handleSortByChange('view_count', 'просмотрам');
    handleMenuClose();
  };

  return (
    <div
      className={classNamesParser(
        'filters-header ' + scrollDirection,
        props.classNames,
      )}>
      <div
        className={`filters-header__title-wrapper ${
          scrollPosition <= 0 ? '' : 'hide'
        }`}>
        <h2 className='filters-header__title'>in good hands</h2>
        <h3 className='filters-header__sub-title'>
          сервис безвоздмездной передачи вещей
        </h3>
      </div>

      <div className='filters-header__categories-wrapper'>
        <ToggleButtonGroup
          className='filters-header__categories'
          exclusive
          value={ads.idCategory}
          onChange={controller.handleChangeCategory}>
          {app.categories.map((category) => (
            <ToggleButton
              key={category.id}
              value={category.id}
              className={`filters-header__category-btn ${
                Number(ads.idCategory) === category.id ? 'toggled' : ''
              }`}>
              <span className='filters-header__category-icon'>
                {category.icon}
              </span>
              <span className='filters-header__category-title'>
                {category.title}
              </span>
            </ToggleButton>
            // <CategoryItem
            //   key={category.id}
            //   category={category.title}
            //   id={category.id}
            //   icon={category.icon}
            // />
          ))}
        </ToggleButtonGroup>
      </div>

      <div className='filters-header__search-bar container'>
        <Select
          classNames={['filters-header__city-select']}
          options={[
            { value: '-1', title: 'Все города', id: '-1' },
            ...app.cities,
          ]}
          onChange={controller.handleChangeCity}
          value={ads.idCity}
        />
        <Input
          classNames={['filters-header__search-input']}
          placeholder='Введите название'
          onInput={controller.handleChangeTitle}
          value={ads.title}
        />
        <Button
          classNames={['filters-header__search-btn']}
          onClick={controller.handleSearch}>
          <span className='filters-header__search-btn-title'>Найти</span>
          <SearchIcon className='filters-header__search-btn-icon' />
        </Button>
      </div>
      <div className='filters-header__sorting'>
        <span>Сортировать по</span>
        <span
          className='filters-header__sorting-value'
          onClick={handleMenuOpen}>
          {ads.sortByTitle}
          <ArrowDropDownIcon className='filters-header__dropdown-icon' />
        </span>
        <IconButton
          className='filters-header__sort-btn'
          onClick={controller.handleChangeSortType}>
          <SortIcon
            className={`filters-header__sort-icon ${
              ads.sortType === 'asc' ? 'rotated' : ''
            }`}
          />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={onDateParamClick}>дате публикации</MenuItem>
        <MenuItem onClick={onViewCountParamClick}>просмотрам</MenuItem>
      </Menu>
    </div>
  );
};

export default FiltersHeader;
