import { ChangeEvent } from 'react';
import { SearchService } from '..';
import { ISearchController } from '../../../interfaces/admin.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import { AdsSearchParamsTypes } from '../../../types/ads.types';
import {
  setPage,
  setSearchParam,
  setSearchParamTitle,
  setSearchValue,
  setTotalPages,
} from '../slices/ads-search.slice';
import {
  setPage as setUserPage,
  setSearchParam as setUserSearchParam,
  setSearchParamTitle as setUserSearchParamTitle,
  setSearchValue as setUserSearchValue,
  setTotalPages as setUserTotalPages,
} from '../slices/user-search.slice';
import { UsersSearchParamsTypes } from '../../../types/admin.types';

export class SearchController implements ISearchController {
  dispatch: AppDispatch;
  getState: () => RootState;
  searchService: SearchService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.searchService = new SearchService();
  }

  handleChangeAdsSearchParam = (param: AdsSearchParamsTypes, title: string) => {
    this.dispatch(setSearchParam(param));
    this.dispatch(setSearchParamTitle(title));
  };

  handleSearchAds = () => {
    this.dispatch(setPage(1));
    this.dispatch(setTotalPages(0));
    this.dispatch(this.searchService.searchAds());
  };

  handleChangeAdsPage = (_: any, value: number) => {
    const adsState = this.getState().adsSearch;
    if (adsState.page === value) return;
    this.dispatch(setPage(value));
    this.dispatch(this.searchService.searchAds());
  };

  handleChangeUserSearchParam = (
    param: UsersSearchParamsTypes,
    title: string,
  ) => {
    this.dispatch(setUserSearchParam(param));
    this.dispatch(setUserSearchParamTitle(title));
  };

  handleSearchUsers = () => {
    this.dispatch(setUserPage(1));
    this.dispatch(setUserTotalPages(0));
    this.dispatch(this.searchService.searchUsers());
  };

  handleChangeUsersPage = (_: any, value: number) => {
    const userSearch = this.getState().userSearch;
    if (userSearch.page === value) return;
    this.dispatch(setUserPage(value));
    this.dispatch(this.searchService.searchUsers());
  };

  onAdsSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setSearchValue(e.target.value));
  };
  onUsersSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setUserSearchValue(e.target.value));
  };

  onBanAdvert = async (id: number) => {
    await this.dispatch(this.searchService.onBanAdvert(id));
    this.dispatch(this.searchService.searchAds());
  };
  onUnbanAdvert = async (id: number) => {
    await this.dispatch(this.searchService.onUnbanAdvert(id));
    this.dispatch(this.searchService.searchAds());
  };
  onSendToModeration = async (id: number) => {
    await this.dispatch(this.searchService.onSendToModeration(id));
    this.dispatch(this.searchService.searchAds());
  };
}
