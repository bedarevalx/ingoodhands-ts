import {
  changeDealStatus,
  confirmReservation,
  createReview,
  declineReservation,
  getDeals,
  getReservations,
} from '../../../api/in-good-hands.api';
import { parseDate } from '../../../helpers/parseDate';
import { useSnackbar } from '../../../hooks/useSnackbar';
import {
  IDeal,
  IReservation,
} from '../../../interfaces/reservations.interfaces';
import { AppDispatch, RootState } from '../../../store';
import { DealsSearchParamTypes } from '../../../types/ads.types';
import {
  fetchDealsFulfilled,
  fetchDealsPending,
  setTotalPages as setDealsTotalPages,
  setIsReviewLoading,
  setPage as setDealsPage,
} from '../slices/deals.slice';
import {
  fetchReservationsFulfilled,
  fetchReservationsPending,
  setTotalPages,
  setPage as setReservationsPage,
} from '../slices/reservations.slice';

export class ReservationService {
  showSuccess: (text: string) => void = useSnackbar().showSuccess;
  showError: (text: string) => void = useSnackbar().showError;
  getReservations =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(fetchReservationsPending());
        const state = getState().reservations;

        const response = await getReservations(
          state.limit,
          state.page,
          state.param,
        );

        const reservations: IReservation[] = response.data.data.map(
          (reservation) => ({
            id: reservation.id,
            createdAt: parseDate(reservation.created_at),
            days: reservation.days,

            post: {
              id: reservation.post.id,
              title: reservation.post.title,
              city: reservation.post.city.name,
              imagePath: reservation.post.image_set[0],
              description: reservation.post.description,
              date: parseDate(reservation.post.created_at),
              isFavorite: false,
              user: {
                createdAt: parseDate(reservation.post.user.created_at),
                id: reservation.post.user.id,
                name: reservation.post.user.name,
                rating: reservation.post.user.rating,
              },
              address:
                reservation.contacts?.address?.title ||
                reservation.post.city.name,
            },
            user: {
              createdAt: parseDate(reservation.user.created_at),
              id: reservation.user.id,
              name: reservation.user.name,
              rating: reservation.user.rating,
            },
          }),
        );

        dispatch(fetchReservationsFulfilled(reservations));
        dispatch(setTotalPages(response.data.total_pages));
        if (reservations.length === 0 && state.page > 1) {
          dispatch(setReservationsPage(state.page - 1));
          dispatch(this.getReservations());
        }
      } catch (error) {
        console.log(error);
      }
    };

  getDeals = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchDealsPending());
      const state = getState().deals;

      const response = await getDeals(
        state.limit,
        state.page,
        JSON.parse(state.param) as DealsSearchParamTypes[],
      );

      const deals: IDeal[] = response.data.data.map((deal) => ({
        id: deal.id,
        createdAt: parseDate(deal.created_at),
        days: deal.days,
        status: deal.status,
        post: {
          id: deal.post.id,
          title: deal.post.title,
          city: deal.post.city.name,
          imagePath: deal.post.image_set[0],
          description: deal.post.description,
          date: parseDate(deal.post.created_at),
          isFavorite: false,
          user: {
            createdAt: parseDate(deal.post.user.created_at),
            id: deal.post.user.id,
            name: deal.post.user.name,
            rating: deal.post.user.rating,
          },
          address: deal.contacts?.address.title || deal.post.city.name,
        },
        expiredAt: parseDate(deal.expired_at),
        score: deal.review?.score,
        user: {
          createdAt: parseDate(deal.user.created_at),
          id: deal.user.id,
          name: deal.user.name,
          rating: deal.user.rating,
        },
      }));

      dispatch(fetchDealsFulfilled(deals));
      dispatch(setDealsTotalPages(response.data.total_pages));
      if (deals.length === 0 && state.page > 1) {
        dispatch(setDealsPage(state.page - 1));
        dispatch(this.getDeals());
      }
    } catch (error) {
      console.log(error);
    }
  };

  confirmReservation =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await confirmReservation(id);
        this.showSuccess('Бронирование успешно подтверждено');
        return response.data;
      } catch (error: any) {
        this.showError(error.response.data);
        console.log(error);
      }
    };

  declineReservation =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await declineReservation(id);
        this.showSuccess('Бронирование успешно отклонено');
        return response.data;
      } catch (error: any) {
        this.showError(error.response.data);
        console.log(error);
      }
    };

  confirmDeal =
    (id: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const response = await changeDealStatus(id, 'completed');
        this.showSuccess('Сделка успешно подтверждена');
        return response.data;
      } catch (error: any) {
        this.showError(error.response.data);
      }
    };

  createReview =
    (score: number, text: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        dispatch(setIsReviewLoading(true));
        const state = getState().deals;
        if (!state.idReservation) {
          throw new Error('Произошла ошибка');
        }
        const response = await createReview(state.idReservation, score, text);

        dispatch(setIsReviewLoading(false));
        this.showSuccess('Отзыв создан успешно');
      } catch (error: any) {
        this.showError(error.response.data);
        console.log(error);
      } finally {
        dispatch(setIsReviewLoading(false));
      }
    };
}
