import { AdsStatusTypes } from '../types/general.types';

export const getLocaleAdsState = (state: AdsStatusTypes) => {
  const adsStatus = {
    active: 'Активное',
    review: 'На проверке',
    closed: 'Завершено',
    banned: 'Заблокировано',
    pending: 'Ожидает проверки',
    reserved: 'Забронировано',
    rejected: 'Не прошло проверку',
  };
  return adsStatus[state] as string;
};
