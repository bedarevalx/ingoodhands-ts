import { ReservationSearchParamTypes } from '../types/ads.types';
import { AdsStatusTypes } from '../types/general.types';

interface IMyAdFilter {
  value: AdsStatusTypes | '';
  title: string;
}

export const MyAdsFilters: IMyAdFilter[] = [
  { value: '', title: 'Все' },
  { value: 'active', title: 'Активные' },
  { value: 'reserved', title: 'Забронированные' },
  { value: 'closed', title: 'Завершенные' },
];
