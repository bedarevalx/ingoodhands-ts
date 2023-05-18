import { ReservationSearchParamTypes } from '../types/ads.types';

interface IReservationFilter {
  value: ReservationSearchParamTypes;
  title: string;
}

export const ReservationsFilters: IReservationFilter[] = [
  { value: 'incoming', title: 'Входящие' },
  { value: 'outcoming', title: 'Исходящие' },
];
