import { getUserPosts } from '../../../api/in-good-hands.api';

import { IUserAd } from '../../../interfaces/profile.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchMyAdsFulfilled,
  fetchMyAdsPending,
  fetchMyAdsRejected,
  setTotalPages,
} from '../slices/my-ads.slice';

export class MyAdsService {
  dispatch: AppDispatch;
  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  getMyAds = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const myAds = getState().myAds;
      dispatch(fetchMyAdsPending());
      const response = await getUserPosts(myAds.page);
      const userAds: IUserAd[] = response.data.data.map((ad) => ({
        title: ad.title,
        address: ad.address.title,
        city: ad.city.name,
        category: {
          value: ad.category.id,
          title: ad.category.name,
          icon: ad.category.icon,
          id: ad.category.id,
          isActive: ad.category.is_active,
        },
        date: ad.date,
        viewCount: ad.view_count,
        likeCount: ad.like_count,
        imagePath: ad.image_set[0],
        id: ad.id,
        status: ad.status,
        description: ad.description,
        isFavorited: false,
      }));

      dispatch(setTotalPages(response.data.total_pages));
      dispatch(fetchMyAdsFulfilled(userAds));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchMyAdsRejected(error.message));
    }
  };
}
