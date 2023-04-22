import { IMenuItem } from '../interfaces/general.interfaces';
import { ProfilePageMenuTypes } from '../types/menu.types';

export const ProfileMenuMocks: IMenuItem<ProfilePageMenuTypes>[] = [
  { id: 1, value: 'profile', text: 'Мой профиль' },
  { id: 2, value: 'profile/my-ads', text: 'Мои объявления' },
  { id: 3, value: 'profile/favorites', text: 'Избранное' },
  { id: 4, value: 'profile/reviews', text: 'Мои отзывы' },
];
