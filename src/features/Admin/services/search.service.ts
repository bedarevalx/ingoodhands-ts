import {
  banAdvert,
  banUser,
  searchAds,
  searchUsers,
  sendToModeration,
  setUserRole,
  unbanUser,
} from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import { useSnackbar } from '../../../hooks/useSnackbar';
import {
  IAdsSearchParams,
  ISearchedUser,
  IUserSearchParams,
} from '../../../interfaces/admin.interfaces';
import { IAdPreview, IAdvert } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { UserPrivilegeTypes } from '../../../types/general.types';

import {
  fetchSearchAdsFulfilled,
  fetchSearchAdsPending,
  fetchSearchAdsRejected,
  setTotalPages,
} from '../slices/ads-search.slice';
import {
  fetchSearchUsersFulfilled,
  fetchSearchUsersPending,
  setTotalPages as setUserTotalPages,
} from '../slices/user-search.slice';

export class SearchService {
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;
  searchAds =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchSearchAdsPending());
        const searchState = getState().adsSearch;
        const params: IAdsSearchParams = {
          title:
            searchState.searchParam === 'title'
              ? searchState.searchValue
              : undefined,
          id_ad:
            searchState.searchParam === 'id_ad'
              ? searchState.searchValue
              : undefined,
          id_user:
            searchState.searchParam === 'id_user'
              ? searchState.searchValue
              : undefined,
          offset: searchState.offset,
          limit: searchState.limit,
          page: searchState.page,
        };
        const response = await searchAds(params);

        const ads: IAdvert[] = response.data.data.map((ad) => ({
          id: ad.id,
          title: ad.title,
          description: ad.description,
          category: {
            title: ad.category.name,
            icon: ad.category.icon,
            id: ad.category.id,
            value: ad.category.name,
            isActive: ad.category.is_active,
          },
          city: {
            title: ad.city.name,
            id: ad.city.id,
            value: ad.city.name,
            isActive: ad.city.is_active,
          },
          address: {
            latitude: 0,
            longitude: 0,
            title: '',
          },
          createdAt: parseDate(ad.created_at),
          updatedAt: parseDate(ad.updated_at),
          imageSet: ad.image_set,
          status: ad.status,
          viewCount: ad.view_count,
          user: {
            name: ad.user.name,
            id: ad.user.id,
            createdAt: parseDate(ad.user.created_at),
            rating: ad.user.rating,
          },
        }));
        dispatch(fetchSearchAdsFulfilled(ads));
        dispatch(
          setTotalPages(
            response.data.total === 0 ? 0 : response.data.total_pages,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    };
  searchUsers =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchSearchUsersPending());
        const searchState = getState().userSearch;
        const params: IUserSearchParams = {
          email:
            searchState.searchParam === 'email'
              ? searchState.searchValue
              : undefined,
          id_user:
            searchState.searchParam === 'id_user'
              ? searchState.searchValue
              : undefined,
          limit: searchState.limit,
          page: searchState.page,
        };
        const response = await searchUsers(params);
        console.log(response.data.data);

        const users: ISearchedUser[] = response.data.data.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phone_number,
          city: user.city.name,
          rating: user.rating,
          createdAt: parseDate(user.created_at),
          isBanned: user.status === 'banned',
          roles: user.permissions,
        }));

        dispatch(fetchSearchUsersFulfilled(users));
        dispatch(
          setUserTotalPages(
            response.data.total === 0 ? 0 : response.data.total_pages,
          ),
        );
      } catch (error) {
        console.log(error);
      }
    };

  onBanAdvert =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await banAdvert(id);
        this.showSuccess('Объявление успешно заблокировано');
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };

  onUnbanAdvert =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await sendToModeration(id);
        this.showSuccess('Объявление успешно разблокировано');
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };

  onSendToModeration =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await sendToModeration(id);
        this.showSuccess('Объявление отправлено на модерацию');
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };

  onBanUser =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await banUser(id);
        this.showSuccess('Пользователь успешно заблокирован');
      } catch (error) {
        this.showError('Не удалось заблокировать пользователя');
      }
    };

  onUnbanUser =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await unbanUser(id);
        this.showSuccess('Пользователь успешно разблокирован');
      } catch (error) {
        this.showError('Не удалось разблокировать пользователя');
      }
    };

  onSetUserRole =
    (id: number, role: UserPrivilegeTypes) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await setUserRole(id, role);
        this.showSuccess('Роль пользователя изменена');
      } catch (error) {
        console.error(error);
        this.showError('Не удалось изменить роль пользователя');
      }
    };
}
