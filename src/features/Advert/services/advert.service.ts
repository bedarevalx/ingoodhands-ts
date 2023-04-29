import { getPost } from '../../../api/in-good-hands.api';
import { IAdvert } from '../../../interfaces/ads.interfaces';
import { AppDispatch, RootState } from '../../../store';

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
        address: response.data.address,
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
      };
      return advert;
    };
}
