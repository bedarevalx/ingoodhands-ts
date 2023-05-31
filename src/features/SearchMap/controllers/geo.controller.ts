import { AppDispatch, RootState, store } from '../../../store';
import { ChangeEvent } from 'react';
import { IAdsController } from '../../../interfaces/ads.interfaces';
import { GeoService } from '../services/geo.service';
import {
  setInputValue,
  setPickedAddress,
  setCity,
  setSearchedItems,
} from '../slices/geo.slice';
import { SelectChangeEvent } from '@mui/material';

export class GeoController implements IAdsController {
  dispatch: AppDispatch;
  getState: () => RootState;
  geoService: GeoService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.getState = store.getState;
    this.geoService = new GeoService(dispatch);
  }

  searchByInput = async () => {
    const geo = this.getState().geo;
    const app = this.getState().app;

    const city = app.cities.find(
      (city) => String(city.id) === String(geo.cityValue),
    );
    return await this.dispatch(
      this.geoService.searchByAddress(
        `${city?.title ? city.title : ''} ${geo.inputValue}`,
      ),
    );
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

  onCityChange = (value: string) => {
    this.dispatch(setPickedAddress({ title: '', latitude: 0, longitude: 0 }));
    this.dispatch(setCity(value));
    this.dispatch(setSearchedItems([]));
  };

  onSaveAddress = () => {
    this.dispatch(this.geoService.saveAddress());
  };
}
