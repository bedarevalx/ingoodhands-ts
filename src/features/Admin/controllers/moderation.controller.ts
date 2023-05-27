import { NavigateFunction } from 'react-router-dom';
import { AdsService, ModerationService } from '..';
import { IAdminAdsController } from '../../../interfaces/admin.interfaces';
import { AppDispatch, RootState, store } from '../../../store';
import {
  setIsPublishing,
  setIsRejecting,
  setReason,
  setRejectModalOpened,
} from '../slices/moderation.slice';
import { ChangeEvent } from 'react';

export class ModerationController implements IAdminAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  moderationService: ModerationService;
  navigate: NavigateFunction;

  constructor(dispatch: AppDispatch, navigate: NavigateFunction) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.moderationService = new ModerationService();
    this.navigate = navigate;
  }

  showRejectModal = () => {
    this.dispatch(setRejectModalOpened(true));
  };

  hideRejectModal = () => {
    this.dispatch(setRejectModalOpened(false));
  };

  startModeration = (id: string) => {
    this.dispatch(this.moderationService.startModeration(id));
  };

  onReject = async () => {
    const state = this.getState().moderation;
    this.dispatch(setIsRejecting(true));
    state.moderationId &&
      (await this.dispatch(
        this.moderationService.rejectAdvert(state.moderationId, state.reason),
      ));
    this.dispatch(setIsRejecting(false));
    this.navigate('/admin');
  };

  onPublish = async () => {
    const state = this.getState().moderation;
    this.dispatch(setIsPublishing(true));

    state.moderationId &&
      (await this.dispatch(
        this.moderationService.publishAdvert(state.moderationId),
      ));
    this.dispatch(setIsPublishing(false));
    this.navigate('/admin');
  };

  onReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setReason(e.target.value));
  };

  onCancelModeration = async () => {
    const state = this.getState().moderation;
    state.moderationId &&
      (await this.dispatch(
        this.moderationService.cancelModeration(state.moderationId),
      ));
    this.navigate('/admin');
  };

  clearState = () => {
    this.dispatch(setReason(''));
    this.dispatch(setRejectModalOpened(false));
  };
}
