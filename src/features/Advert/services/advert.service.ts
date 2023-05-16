import {
  getContacts,
  getPost,
  getReviews,
  getSimilarPosts,
  sendReservation,
} from '../../../api/in-good-hands.api';
import {
  IAdPreview,
  IAdvert,
  IReview,
} from '../../../interfaces/ads.interfaces';
import { IContactResponse } from '../../../interfaces/responses.interfaces';
import { AppDispatch, RootState } from '../../../store';
import {
  fetchContactsFulFilled,
  fetchContactsPending,
  fetchContactsRejected,
  fetchSimilarPostsFulFilled,
  fetchSimilarPostsPending,
  fetchSimilarPostsRejected,
  setIsLastReviewsPage,
  setIsReservationLoading,
  setReviews,
  setReviewsLoading,
  setReviewsPage,
} from '../slices/advert.slice';
import { parseDate } from '../../../helpers/parseDate';

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
        createdAt: parseDate(response.data.post.created_at),
        updatedAt: parseDate(response.data.post.updated_at),
        imageSet: response.data.post.image_set,
        status: response.data.post.status,
        viewCount: response.data.post.view_count,
        user: {
          name: response.data.post.user.name,
          id: response.data.post.user.id,
          createdAt: parseDate(response.data.post.user.created_at),
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
              date: parseDate(ad.created_at),
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

  getReviews =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().advert;
        if (!state.user?.id) {
          return;
        }
        dispatch(setReviewsLoading(true));
        const response = await getReviews(
          state.user?.id,
          state.reviewsPage,
          state.reviewsLimit,
        );
        console.log(response);

        if (response.data.page === response.data.total_pages) {
          dispatch(setIsLastReviewsPage(true));
        } else {
          dispatch(setIsLastReviewsPage(false));
          dispatch(setReviewsPage(state.reviewsPage + 1));
        }

        const reviews: IReview[] = response.data.data.map((review) => ({
          id: review.id,
          text: review.text,
          score: review.score,
          createdAt: parseDate(review.created_at),
          idReservation: review.id_reservation,
          writenBy: review.user_writer.name,
        }));

        dispatch(setReviews(reviews));
        dispatch(setReviewsLoading(false));
      } catch (error) {
        dispatch(setReviewsLoading(false));
        console.log(error);
      }
    };

  reserveAdvert =
    (days: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(setIsReservationLoading(true));
        const state = getState().advert;
        const response = await sendReservation(String(state.id), days);
        console.log(response);

        dispatch(setIsReservationLoading(false));
      } catch (error) {
        console.log(error);
      }
    };
}
