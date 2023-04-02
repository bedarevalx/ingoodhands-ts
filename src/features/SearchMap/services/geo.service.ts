import { forwardGeocoding, reverseGeocoding } from '../../../api/dadata.api';
import { AppDispatch, RootState } from '../../../store';
import { setPickedAddress, setSearchedItems } from '../slices/geo.slice';

export class GeoService {
  searchByAddress =
    (value: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      console.log(value);

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
      console.log(
        response.data.suggestions.map((suggestion) => suggestion.value),
      );

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
}
