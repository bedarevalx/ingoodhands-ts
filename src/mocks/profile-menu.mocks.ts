import { ProfilePageMenuTypes } from '../types/profileMenu.types';

interface IProfileMenuItem {
  id: number;
  value: ProfilePageMenuTypes;
  text: string;
}

export const ProfileMenuMocks: IProfileMenuItem[] = [
  { id: 1, value: 'profile', text: 'Мой профиль' },
  { id: 2, value: 'profile/my-ads', text: 'Мои объявления' },
  { id: 3, value: 'profile/favorites', text: 'Избранное' },
  { id: 4, value: 'profile/reviews', text: 'Мои отзывы' },
];
