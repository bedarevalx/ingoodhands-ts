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

  handleReservationParamsChange = (
    _: any,
    param: ReservationSearchParamTypes,
  ) => {
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
    this.dispatch(setDealsSearchParam(param));
    this.getDeals();
  };

  clearDealsValues = () => {
    this.dispatch(clearDealsState());
  };

  clearValues = () => {
    this.dispatch(clearState());
  };
}
