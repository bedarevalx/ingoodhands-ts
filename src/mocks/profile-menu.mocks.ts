import { ProfilePageMenuTypes } from '../types/profileMenu.types';

interface IProfileMenuItem {
  id: number;
  value: ProfilePageMenuTypes;
  text: string;
}

export const ProfileMenuMocks: IProfileMenuItem[] = [
  { id: 5, value: 'profile', text: 'Мой профиль' },
  { id: 1, value: 'profile/my-ads', text: 'Мои объявления' },
  { id: 2, value: 'profile/reviews', text: 'Мои отзывы' },
  { id: 4, value: 'profile/favorites', text: 'Избранное' },
];
