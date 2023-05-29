import React, { useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { SearchController } from '../../controllers/search.controller';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Input from '../../../../UI/Input';
import LoadedButton from '../../../../UI/LoadedButton';
import { Menu, MenuItem, Pagination } from '@mui/material';
import { UserSearchItem } from '../..';
import Spinner from '../../../../UI/Spinner';

interface IUserSearchFormProps {
  classNames?: string[];
}

export const UserSearchForm = (props: IUserSearchFormProps) => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.userSearch);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const controller = new SearchController(dispatch);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onUserIdParamClick = () => {
    controller.handleChangeUserSearchParam('id_user', 'ID пользователя');
    handleClose();
  };

  const onEmailParamClick = () => {
    controller.handleChangeUserSearchParam('email', 'электронной почте');
    handleClose();
  };
  return (
    <div className={classNamesParser('user-search-form', props.classNames)}>
      <div className='user-search-form__header'>
        <h3 className='user-search-form__title'>Поиск пользователей по</h3>
        <div className='user-search-form__search-param' onClick={handleClick}>
          <h3> {searchState.searchParamTitle}</h3>
          <ArrowDropDownIcon className='user-search-form__dropdown-icon' />
        </div>
      </div>
      <div className='user-search-form__search-wrapper'>
        <Input
          classNames={['user-search-form__search-input']}
          placeholder='Введите поисковой запрос'
          value={searchState.searchValue}
          onInput={controller.onUsersSearchInputChange}
        />
        <LoadedButton
          isLoading={searchState.isLoading}
          onClick={controller.handleSearchUsers}
          classNames={['user-search-form__search-btn']}
          label='Найти'
        />
      </div>
      <div className='user-search-form__list'>
        {searchState.users.length === 0 && !searchState.isLoading && (
          <p>Ничего не найдено</p>
        )}
        {searchState.isLoading && (
          <Spinner classNames={['user-search-form__spinner']} />
        )}
        {searchState.users.map((user) => (
          <UserSearchItem
            key={user.id}
            email={user.email}
            name={user.name}
            city={user.city}
            createdAt={user.createdAt}
            isBanned={user.isBanned}
            id={user.id}
            phoneNumber={user.phoneNumber}
            rating={user.rating}
            roles={user.roles}
            onBanUser={controller.onBanUser}
            onUnbanUser={controller.onBanUser}
            onSetRole={controller.onSetUserRole}
          />
        ))}
      </div>

      <div className='user-search-form__pagination-wrapper'>
        <Pagination
          page={searchState.page}
          count={searchState.totalPages}
          onChange={controller.handleChangeUsersPage}
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={onUserIdParamClick}>ID пользователя</MenuItem>
        <MenuItem onClick={onEmailParamClick}>электронной почте</MenuItem>
      </Menu>
    </div>
  );
};
