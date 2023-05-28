import { AppDispatch, RootState, store } from '../../../store';

export class HistoryController {
  dispatch: AppDispatch;
  getState: () => RootState;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
  }
}
