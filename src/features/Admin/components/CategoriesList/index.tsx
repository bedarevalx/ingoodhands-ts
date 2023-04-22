import React, { useEffect, useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CategoryAddModal from '../CategoryAddModal';
import { ICategory } from '../../../../interfaces/general.interfaces';
import Button from '../../../../UI/Button';
import { useDispatch } from 'react-redux';
import { DictionariesController } from '../..';
import Spinner from '../../../../UI/Spinner';

interface ICategoriesListProps {
  classNames?: string[];
}

export const CategoriesList = (props: ICategoriesListProps) => {
  const dispatch = useDispatch();
  const categories = useAppSelector((state) => state.categories);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const controller = new DictionariesController(dispatch);
  const isMenuOpened = Boolean(anchorEl);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: ICategory,
  ) => {
    setAnchorEl(event.currentTarget);
    controller.setMenuToCategory(category);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    controller.handleCategoryEdit();
    handleMenuClose();
  };

  const handleDelete = () => {
    controller.handleCategoryDelete();
    handleMenuClose();
  };

  useEffect(() => {
    if (categories.categories.length === 0) controller.getAllCategories();
  }, []);

  return (
    <div className={classNamesParser('categories-list', props.classNames)}>
      <div className='categories-list__header'>
        <h3>Управление категориями</h3>
        <Button
          onClick={controller.handleCategoryAdd}
          classNames={['categories-list__button-add']}>
          Добавить
        </Button>
      </div>
      {categories.isFetching ? <Spinner /> : null}
      <div className='categories-list__list'>
        {categories.categories.map((category) => (
          <div className='categories-list__category' key={category.id}>
            <div className='categories-list__category-icon-wrapper'>
              <span className='categories-list__category-icon'>
                {category.icon}
              </span>
            </div>
            <div className='categories-list__category-info'>
              <p className='categories-list__category-title'>
                {category.title}
              </p>
              <p className='categories-list__category-activity'>
                {category.isActive ? 'Активна' : 'Не активна'}
              </p>
            </div>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={isMenuOpened ? 'long-menu' : undefined}
              aria-expanded={isMenuOpened ? 'true' : undefined}
              aria-haspopup='true'
              onClick={(e) => handleMenuOpen(e, category)}>
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
      <CategoryAddModal
        title={categories.title}
        icon={categories.icon}
        isActive={categories.isActive}
        isEditing={categories.isEditing}
        isLoading={categories.isLoading}
        isOpen={categories.isModalVisible}
        onActivityChange={controller.handleCategoryActivityChange}
        onTitleChange={controller.handleCategoryTitleChange}
        onIconChange={controller.handleCategoryIconChange}
        onAddCategory={controller.onAddNewCategory}
        onEditCategory={controller.onEditCategory}
        handleClose={controller.handleCategoryModalClose}
        classNames={['category-add-modal__modal']}
      />
    </div>
  );
};
