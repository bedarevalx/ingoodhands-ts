import { AdsStatusTypes } from '../types/general.types';

export const getStateColor = (state: AdsStatusTypes) => {
  const adsStatus = {
    active: '#00A36C', //green
    review: '#FFA500', //orange
    closed: '#00A36C', //green
    banned: '#ff0000', //red
    pending: '#FFA500', //orange
    reserved: '#0000FF', //bue
    rejected: '#ff0000', //red
  };
  return adsStatus[state] as string;
};
