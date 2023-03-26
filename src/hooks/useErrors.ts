import { APP_ERRORS } from '../utils/errors';

export const useErros = () => {
  const e = (key: string) => {
    return (
      APP_ERRORS[key as keyof object] ||
      'Произошла ошибка, повторите попытку позже'
    );
  };

  return e;
};
