import { ReservationService } from '..';
import { AppDispatch, RootState, store } from '../../../store';
import {
  DealsSearchParamTypes,
  ReservationSearchParamTypes,
} from '../../../types/ads.types';
import {
  clearState,
  setPage,
  setSearchParam,
} from '../slices/reservations.slice';
import {
  clearState as clearDealsState,
  setPage as setDealsPage,
  setSearchParam as setDealsSearchParam,
  setIdReservation,
  setReviewModalOpened,
} from '../slices/deals.slice';

export class ReservationController {
  dispatch: AppDispatch;
  getState: () => RootState;
  reservationService: ReservationService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.reservationService = new ReservationService();
  }

  getReservations = () => {
    this.dispatch(this.reservationService.getReservations());
  };

  getDeals = () => {
    this.dispatch(this.reservationService.getDeals());
  };

  handleConfirmReservation = async (id: number) => {
    const response = await this.dispatch(
      this.reservationService.confirmReservation(id),
    );
    this.getReservations();
  };

  handleDeclineReservation = async (id: number) => {
    const response = this.dispatch(
      this.reservationService.declineReservation(id),
    );
    this.getReservations();
  };

  handleReservationParamsChange = (
    _: any,
    param: ReservationSearchParamTypes,
  ) => {
    if (!param) {
      return;
    }
    this.dispatch(setSearchParam(param));
    this.dispatch(setPage(1));
    this.getReservations();
  };

  handlePageChange = (_: any, page: number) => {
    const state = this.getState().reservations;
    if (page === state.page) {
      return;
    }
    this.dispatch(setPage(page));
    this.getReservations();
  };

  handleDealsPageChange = (_: any, page: number) => {
    const state = this.getState().deals;
    if (page === state.page) {
      return;
    }
    this.dispatch(setDealsPage(page));
    this.getDeals();
  };

  handleDealsParamChange = (_: any, param: string) => {
    if (!param) {
      return;
    }
    this.dispatch(setDealsSearchParam(param));
    this.dispatch(setDealsPage(1));
    this.getDeals();
  };

  clearDealsValues = () => {
    this.dispatch(clearDealsState());
  };

  clearValues = () => {
    this.dispatch(clearState());
  };

  handleConfirmDeal = async (id: number) => {
    const response = await this.dispatch(
      this.reservationService.confirmDeal(id),
    );
    this.getDeals();
  };

  onReviewModalOpen = async (id: number) => {
    this.dispatch(setReviewModalOpened(true));
    this.dispatch(setIdReservation(id));
  };

  onReviewModalClose = async () => {
    this.dispatch(setReviewModalOpened(false));
  };

  onCreateReview = async (score: number, text: string) => {
    await this.dispatch(this.reservationService.createReview(score, text));
    this.dispatch(setReviewModalOpened(false));
    this.getDeals();
  };
}
