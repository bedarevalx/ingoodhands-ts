import { startModeration } from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import { IAdvert } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  setIsLoading,
  setFetchError,
  setIsConfirming,
  setPost,
} from '../slices/moderation.slice';

export class ModerationService {
  startModeration =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(setIsLoading(true));
        const response = await startModeration(id);

        const advert: IAdvert = {
          title: response.data.post.title,
          description: response.data.post.description,
          category: {
            title: response.data.post.category.name,
            id: response.data.post.category.id,
            value: response.data.post.category.name,
            icon: response.data.post.category.icon,
            isActive: response.data.post.category.is_active,
          },
          imageSet: response.data.post.image_set,
          id: response.data.post.id,
          city: {
            id: response.data.post.city.id,
            title: response.data.post.city.name,
            value: response.data.post.city.name,
            isActive: response.data.post.city.is_active,
          },
          address: {
            title: response.data.post?.address?.title || '',
            latitude: response.data.post?.address?.latitude || 0,
            longitude: response.data.post.address?.longitude || 0,
          },
          createdAt: parseDate(response.data.post.created_at),
          status: response.data.post.status,
          updatedAt: response.data.post.updated_at,
          viewCount: response.data.post.view_count,
          user: {
            name: response.data.post.user.name,
            id: response.data.post.user.id,
            rating: response.data.post.user.rating,
            createdAt: parseDate(response.data.post.user.created_at),
          },
        };

        dispatch(setPost(advert));
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));
        console.log(error);
      }
    };

  rejectAdvert =
    (id: string, reason: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {};

  publishAdvert =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {};
}
