import { searchAds, searchUsers } from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import {
  IAdsSearchParams,
  ISearchedUser,
  IUserSearchParams,
} from '../../../interfaces/admin.interfaces';
import { IAdPreview, IAdvert } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';

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
        const users: ISearchedUser[] = response.data.data.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          phoneNumber: user.phone_number,
          city: user.city.name,
          rating: user.rating,
          createdAt: parseDate(user.created_at),
          isBanned: user.blocked_admin,
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
}
