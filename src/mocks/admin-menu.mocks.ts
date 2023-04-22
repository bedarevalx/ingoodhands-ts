import { IMenuItem } from '../interfaces/general.interfaces';
import { AdminMenuTypes } from '../types/menu.types';

export const AdminMenuMocks: IMenuItem<AdminMenuTypes>[] = [
  { id: 1, value: 'admin', text: 'Панель администратора' },
  { id: 2, value: 'admin/pending', text: 'Ожидают проверки' },
  { id: 3, value: 'admin/users', text: 'Пользователи' },
  { id: 3, value: 'admin/categories', text: 'Категории' },
  { id: 3, value: 'admin/cities', text: 'Города' },
];
