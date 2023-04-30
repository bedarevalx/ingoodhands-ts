import moment from 'moment';
import {
  getContacts,
  getPost,
  getSimilarPosts,
} from '../../../api/in-good-hands.api';
import { IAdPreview, IAdvert } from '../../../interfaces/ads.interfaces';
import { IContactResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchContactsFulFilled,
  fetchContactsPending,
  fetchContactsRejected,
  fetchSimilarPostsFulFilled,
  fetchSimilarPostsPending,
  fetchSimilarPostsRejected,
} from '../slices/advert.slice';

export class AdvertService {
  getAdvertById =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const response = await getPost(id);
      const advert: IAdvert = {
        id: response.data.post.id,
        title: response.data.post.title,
        description: response.data.post.description,
        category: {
          title: response.data.post.category.name,
          icon: response.data.post.category.icon,
          id: response.data.post.category.id,
          value: response.data.post.category.name,
          isActive: response.data.post.category.is_active,
        },
        city: {
          title: response.data.post.city.name,
          id: response.data.post.city.id,
          value: response.data.post.city.name,
          isActive: response.data.post.city.is_active,
        },
        address: response.data.address || response.data.contacts?.address,
        createdAt: response.data.post.created_at,
        updatedAt: response.data.post.updated_at,
        imageSet: response.data.post.image_set,
        status: response.data.post.status,
        viewCount: response.data.post.view_count,
        user: {
          name: response.data.post.user.name,
          id: response.data.post.user.id,
          createdAt: response.data.post.user.created_at,
          rating: response.data.post.user.rating,
        },
        phoneNumber: response.data.contacts?.phone,
      };
      return advert;
    };

  getContacts =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().advert;
        if (state.id) {
          dispatch(fetchContactsPending());
          const response = await getContacts(state.id);
          dispatch(fetchContactsFulFilled(response.data));
        }
      } catch (error) {
        console.log(error);
        fetchContactsRejected();
      }
    };

  getSimilarPosts =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().advert;
        if (state.id) {
          dispatch(fetchSimilarPostsPending());
          const response = await getSimilarPosts(state.id);
          console.log(response);

          const ads: IAdPreview[] = response.data.map((ad) => {
            return {
              id: ad.id,
              title: ad.title,
              descripton: ad.description,
              imagePath: ad.image_set[0],
              date: moment(ad.created_at).locale('ru').format('DD MMMM YYYY'),
              city: ad.city.name,
              //TODO: фикс
              isFavorite: false,
            };
          });
          dispatch(fetchSimilarPostsFulFilled(ads));
        }
      } catch (error) {
        console.log(error);
      }
    };
}
