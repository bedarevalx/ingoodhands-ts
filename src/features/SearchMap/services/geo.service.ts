import { forwardGeocoding, reverseGeocoding } from '../../../api/dadata.api';
import { createAddress } from '../../../api/in-good-hands.api';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { AppDispatch, RootState } from '../../../store';
import { ProfileService } from '../../Profile/services/profile.service';
import { setPickedAddress, setSearchedItems } from '../slices/geo.slice';

export class GeoService {
  dispatch: AppDispatch;
  showError: (text: string) => void = useSnackbar().showError;
  showSucess: (text: string) => void = useSnackbar().showSuccess;
  profileService: ProfileService;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.profileService = new ProfileService(this.dispatch);
  }

  searchByAddress =
    (value: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const response = await forwardGeocoding({ query: value });
      const findedAddressses = response.data.suggestions.map(
        (suggestion, i) => ({
          latitude: suggestion.data.geo_lat,
          longitude: suggestion.data.geo_lon,
          title: suggestion.value,
          id: i,
        }),
      );
      dispatch(setSearchedItems(findedAddressses));
    };

  searchByCoords =
    (longitude: number, latitude: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      const response = await reverseGeocoding({
        lat: latitude,
        lon: longitude,
      });

      const findedAddress = response.data.suggestions[0];
      if (findedAddress) {
        dispatch(
          setPickedAddress({
            title: findedAddress.value,
            latitude: findedAddress.data.geo_lat,
            longitude: findedAddress.data.geo_lon,
          }),
        );
      }
    };

  saveAddress =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const state = getState().geo;
        const response = await createAddress(
          state.pickedAddress.title,
          state.cityValue as string,
          state.pickedAddress.latitude,
          state.pickedAddress.longitude,
        );
        this.showSucess('Адрес успешно сохранен');
        dispatch(this.profileService.updateProfile());
      } catch (error) {
        this.showError(
          'Не удалось сохранить адрес, максимальное число сохраненных адресов - 5, или такой адрес уже существует',
        );
      }
    };
}
