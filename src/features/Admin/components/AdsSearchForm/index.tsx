import React, { ChangeEvent, useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { Menu, MenuItem, Pagination, Skeleton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SearchController } from '../../controllers/search.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';
import LoadedButton from '../../../../UI/LoadedButton';
import { AdSearchItem } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';
import Spinner from '../../../../UI/Spinner';

interface IAdsSearchFormProps {
  classNames?: string[];
}
export const AdsSearchForm = (props: IAdsSearchFormProps) => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.adsSearch);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const controller = new SearchController(dispatch);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onTitleParamClick = () => {
    controller.handleChangeAdsSearchParam('title', 'названию');
    handleClose();
  };

  const onUserIdParamClick = () => {
    controller.handleChangeAdsSearchParam('id_user', 'ID пользователя');
    handleClose();
  };

  const onAdvertIdParamClick = () => {
    controller.handleChangeAdsSearchParam('id_ad', 'ID объявления');
    handleClose();
  };

  return (
    <div className={classNamesParser('ads-search-form', props.classNames)}>
      <div className='ads-search-form__header'>
        <h3 className='ads-search-form__title'>Поиск объявлений по</h3>
        <div className='ads-search-form__search-param' onClick={handleClick}>
          <h3> {searchState.searchParamTitle}</h3>
          <ArrowDropDownIcon className='ads-search-form__dropdown-icon' />
        </div>
      </div>
      <div className='ads-search-form__search-wrapper'>
        <Input
          classNames={['ads-search-form__search-input']}
          placeholder='Введите поисковой запрос'
          value={searchState.searchValue}
          onInput={controller.onAdsSearchInputChange}
        />
        <LoadedButton
          isLoading={searchState.isLoading}
          onClick={controller.handleSearchAds}
          classNames={['ads-search-form__search-btn']}
          label='Найти'
        />
      </div>
      <div className='ads-search-form__list'>
        {searchState.isLoading && (
          <Spinner classNames={['ads-search-form__spinner']} />
        )}

        {searchState.ads.length === 0 && !searchState.isLoading && (
          <p>Ничего не найдено</p>
        )}
        {searchState.ads.map((ad) => (
          <AdSearchItem
            key={ad.id}
            title={ad.title}
            user={ad.user}
            description={ad.description}
            createdAt={ad.createdAt}
            imagePath={ad.imageSet[0]}
            id={ad.id}
            status={ad.status}
            variant='search'
            onBan={controller.onBanAdvert}
            onUnban={controller.onUnbanAdvert}
            onUnpublish={controller.onSendToModeration}
          />
        ))}
      </div>
      <div className='ads-search-form__pagination'>
        <Pagination
          page={searchState.page}
          count={searchState.totalPages}
          onChange={controller.handleChangeAdsPage}
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={onTitleParamClick}>названию</MenuItem>
        <MenuItem onClick={onUserIdParamClick}>ID пользователя</MenuItem>
        <MenuItem onClick={onAdvertIdParamClick}>ID объявления</MenuItem>
      </Menu>
    </div>
  );
};
