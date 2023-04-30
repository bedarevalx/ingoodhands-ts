import { useEffect, useRef } from 'react';

import InteractiveMap, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import type { MapRef } from 'react-map-gl';
import { mapboxAccessToken } from '../../../../configs/app.config';
import { classNamesParser } from '../../../../helpers/classNamesParser';

interface IAdvertMapProps {
  classNames?: string[];
  latitude?: number;
  longitude?: number;
  placeName?: string;
}

const DEFAULT_VALUES = {
  longitude: 76.457837,
  latitude: 59.150842,
};

export const AdvertMap = (props: IAdvertMapProps) => {
  const mapRef = useRef<MapRef>(null);

  const onMapLoad = () => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
    flyToMarker();
    // fitBounds();
  };

  const flyToMarker = () => {
    if (mapRef.current && !!props.latitude && !!props.longitude)
      mapRef.current.flyTo({
        center: [props.longitude, props.latitude],
        speed: 3,
        curve: 1,
        zoom: 17,
      });
  };

  useEffect(() => {
    if (mapRef.current && !!props.latitude && !!props.longitude) {
      flyToMarker();
    }
  }, [props.latitude, props.longitude]);

  return (
    <div className={`${classNamesParser('advert-map', props.classNames)}`}>
      {!props.latitude && !props.longitude ? (
        <div className='advert-map__placeholder'>
          <h4 className='advert-map__helper'>
            Нажмите Получить контакты, чтобы узнать адрес объявления
          </h4>
        </div>
      ) : (
        <div className='advert-map__place-name'>{props.placeName}</div>
      )}

      <InteractiveMap
        ref={mapRef}
        trackResize
        onLoad={onMapLoad}
        initialViewState={
          {
            longitude: DEFAULT_VALUES.longitude,
            latitude: DEFAULT_VALUES.latitude,
            zoom: 2,
          } as any
        }
        style={{ width: '100%', minHeight: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={mapboxAccessToken}>
        <NavigationControl position='bottom-right' />
        {props.latitude && props.longitude && (
          <Marker
            onClick={flyToMarker}
            latitude={props.latitude}
            longitude={props.longitude}
            anchor={'center'}
          />
        )}
      </InteractiveMap>
    </div>
  );
};
