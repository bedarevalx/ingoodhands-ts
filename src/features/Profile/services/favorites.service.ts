import {
  addToFavorite,
  getFavorites,
  getFavoritesId,
  removeFromFavorite,
} from '../../../api/in-good-hands.api';
import { IUserAd } from '../../../interfaces/profile.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchFavoritesFulfilled,
  fetchFavoritesPending,
  fetchFavoritesRejected,
  removeFavoriteById,
  setFavoriteById,
  setFavoritesId,
  setTotalPages,
} from '../slices/favorites.slice';
import { parseDate } from '../../../helpers/parseDate';

export class FavoritesService {
  addToFavorites =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await addToFavorite(id);
        dispatch(setFavoriteById(id));
      } catch (error: any) {
        console.error(error.message);
      }
    };

  removeFromFavorites =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await removeFromFavorite(id);
        dispatch(removeFavoriteById(id));
      } catch (error: any) {
        console.error(error.message);
      }
    };

  getFavoritesId =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await getFavoritesId();

        dispatch(setFavoritesId(response.data));
      } catch (error) {
        console.log(error);
      }
    };

  getFavorites =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const favorites = getState().favorites;
        dispatch(fetchFavoritesPending());
        const response = await getFavorites(favorites.page, favorites.limit);

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
            date: parseDate(ad.created_at),
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
