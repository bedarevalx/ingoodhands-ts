import { AdsService, ModerationService } from '..';
import { IAdminAdsController } from '../../../interfaces/admin.interfaces';
import { AppDispatch, RootState, store } from '../../../store';

export class ModerationController implements IAdminAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  moderationService: ModerationService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.moderationService = new ModerationService();
  }

  startModeration = (id: string) => {
    this.dispatch(this.moderationService.startModeration(id));
  };

  onReject = (id: string, reason: string) => {
    this.dispatch(this.moderationService.rejectAdvert(id, reason));
  };

  onPublish = (id: string) => {
    this.dispatch(this.moderationService.publishAdvert(id));
  };

  onCancelModeration = () => {};

  clearState = () => {
    // this.dispatch(setPage(1));
    // this.dispatch(setTotalPages(0));
    // this.dispatch(setAds([]));
  };
}
