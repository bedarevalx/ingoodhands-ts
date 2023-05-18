import { DealsSearchParamTypes } from '../types/ads.types';

interface IDealsFilter {
  value: DealsSearchParamTypes[];
  title: string;
}

export const DealsFilters: IDealsFilter[] = [
  { value: ['order', 'confirm_sent'], title: 'Активные' },
  { value: ['completed'], title: 'Завершенные' },
  { value: ['overdue'], title: 'Просроченные' },
];
