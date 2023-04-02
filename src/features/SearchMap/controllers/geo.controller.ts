import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { GeoService } from '../services/geo.service';
import { setInputValue, setPickedAddress } from '../slices/geo.slice';

export class GeoController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  geoService: GeoService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.geoService = new GeoService();
  }

  searchByInput = async () => {
    const geo = this.getState().geo;
    return await this.dispatch(this.geoService.searchByAddress(geo.inputValue));
  };

  searchByCoords = async (lng: number, lat: number) => {
    return await this.dispatch(this.geoService.searchByCoords(lng, lat));
  };

  onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    this.dispatch(setInputValue(event.target.value));
  };
  onAddressSelect = async (title: any) => {
    this.dispatch(setPickedAddress(title));
  };
  onAddressConfirm = () => {
    const geo = this.getState().geo;
    alert(geo.pickedAddress);
  };
}
