import { IMenuItem } from '../interfaces/general.interfaces';
import { AdminMenuTypes } from '../types/menu.types';

export const AdminMenuMocks: IMenuItem<AdminMenuTypes>[] = [
  { id: 1, value: 'admin', text: 'Панель администратора' },
  { id: 2, value: 'admin/pending', text: 'Ожидают проверки' },
  { id: 3, value: 'admin/categories', text: 'Категории', role: 'admin' },
  { id: 4, value: 'admin/cities', text: 'Города', role: 'admin' },
  { id: 5, value: 'admin/users', text: 'Пользователи', role: 'admin' },
  { id: 6, value: 'admin/ads-search', text: 'Объявления' },
];
