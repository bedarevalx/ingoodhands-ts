export interface IReverseGeocoding {
  lat: number;
  lon: number;
}

export interface ISearchedAddress {
  latitude: number;
  longitude: number;
  title: string;
  id: number;
}

export interface IPickedAddress {
  title: string;
  latitude: number;
  longitude: number;
}
