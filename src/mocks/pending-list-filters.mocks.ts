interface IPendingListFilter {
  value: 'pending' | 'review';
  title: string;
}

export const PendingFilters: IPendingListFilter[] = [
  { value: 'pending', title: 'Ожидают проверки' },
  { value: 'review', title: 'На проверке' },
];
