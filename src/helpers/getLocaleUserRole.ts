import { AdsStatusTypes, UserPrivilegeTypes } from '../types/general.types';

export const getLocaleUserRole = (state: UserPrivilegeTypes) => {
  const userRoles = {
    user: 'Пользователь',
    moderator: 'Модератор',
    admin: 'Администратор',
  };
  return (userRoles[state] as string) || '';
};
