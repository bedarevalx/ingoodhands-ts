import moment from 'moment';

export const parseDate = (date: string) => {
  return moment(date, 'DD MM YYYY').format('D MMMM YYYY');
};
