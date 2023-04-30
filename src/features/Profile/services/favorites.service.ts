import moment from 'moment';
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
} from '../../../api/in-good-hands.api';
import { IUserAd } from '../../../interfaces/profile.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchFavoritesFulfilled,
  fetchFavoritesPending,
  fetchFavoritesRejected,
  setTotalPages,
} from '../slices/favorites.slice';

export class FavoritesService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  addToFavorites =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await addToFavorite(id);
      } catch (error: any) {
        console.error(error.message);
      }
    };

  removeFromFavorites =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await removeFromFavorite(id);
      } catch (error: any) {
        console.error(error.message);
      }
    };

  getFavorites =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const favorites = getState().favorites;
        dispatch(fetchFavoritesPending());
        const response = await getFavorites(favorites.page);

        const userAds: IUserAd[] = response.data.data.map((ad) => {
          return {
            title: ad.title,
            city: ad.city.name,
            category: {
              value: String(ad.category.id),
              title: ad.category.name,
              icon: ad.category.icon,
              id: ad.category.id,
              isActive: ad.category.is_active,
            },
            date: moment(ad.created_at).format('DD MMMM YYYY'),
            imagePath: ad.image_set[0],
            id: ad.id,
            description: ad.description,
            isFavorited: true,
          };
        });

        dispatch(setTotalPages(response.data.total_pages));
        dispatch(fetchFavoritesFulfilled(userAds));
      } catch (error: any) {
        console.error(error);
        dispatch(fetchFavoritesRejected(error.message));
      }
    };
}
