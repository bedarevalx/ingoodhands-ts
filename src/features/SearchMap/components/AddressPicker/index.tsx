import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Modal from '../../../../UI/Modal';
import {
  Button,
  IconButton,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import InteractiveMap, { Marker } from 'react-map-gl';
import { mapboxAccessToken } from '../../../../configs/app.config';
import CloseIcon from '@mui/icons-material/Close';
import AutoComplete from '../../../../UI/AutoComplete';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import useDebounce from '../../../../hooks/useDebounce';
import { GeoController } from '../../controllers/geo.controller';
import { store } from '../../../../store';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IPickedAddress } from '../../../../interfaces/geo.interfaces';

interface IAddressPickerProps {
  classNames?: string[];
  isOpen?: boolean;
  onClick?: (longitude: number, latitude: number) => void;
  handleClose?: () => void;
  onAddressPick?: (address: IPickedAddress) => void;
}

const DEFAULT_VALUES = {
  longitude: 83.76361,
  latitude: 53.36056,
};

export const AddressPicker = (props: IAddressPickerProps) => {
  const dispatch = useAppDispatch();
  const geo = useAppSelector((state) => state.geo);
  const controller = new GeoController(dispatch);
  const debouncedAddress = useDebounce({ value: geo.inputValue, delay: 500 });
  const mapRef = useRef<any>(null);

  useEffect(() => {
    controller.searchByInput();
  }, [debouncedAddress]);

  const onSelect = (value: string | null) => {
    controller.onAddressSelect(value);
    mapRef.current.flyTo({ center: getCenter(), zoom: 16 });
  };

  const getCenter = () => {
    return [
      store.getState().geo.pickedAddress?.longitude,
      store.getState().geo.pickedAddress?.latitude,
    ];
  };

  // const onClear = () => {
  //   props.onClear && props.onClear();
  // };

  const onAddressPick = () => {
    props.onAddressPick && props.onAddressPick(geo.pickedAddress);
  };

  const handleClick = (e: any) => {
    props.onClick && props.onClick(e.lngLat.lng, e.lngLat.lat);
  };
  const onDragEnd = (event: any) => {
    const { lng, lat } = event.lngLat;

    controller.searchByCoords(lng, lat);
  };

  useEffect(() => {
    // dispatch(clearAddresses());
  }, []);

  return (
    <Modal
      open={props.isOpen}
      handleClose={props.handleClose}
      classNames={['address-picker', 'address-picker__modal']}>
      <div className='address-picker__address-wrapper'>
        <AutoComplete
          classNames={['address-picker__auto-complete']}
          items={geo.searchedItems}
          onInput={controller.onInputChange}
          onSelect={onSelect}
          value={geo.inputValue}
          placeholder={'Начните вводить адрес'}
        />
        <IconButton
          className='address-picker__close-btn'
          onClick={props.handleClose}>
          <CloseIcon className='address-picker__close-icon' />
        </IconButton>
      </div>
      <InteractiveMap
        ref={mapRef}
        onClick={handleClick}
        initialViewState={
          {
            longitude: !!geo.pickedAddress.longitude
              ? geo.pickedAddress.longitude
              : DEFAULT_VALUES.longitude,
            latitude: !!geo.pickedAddress.latitude
              ? geo.pickedAddress.latitude
              : DEFAULT_VALUES.latitude,
            zoom: 8,
          } as any
        }
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={mapboxAccessToken}>
        {!!geo.pickedAddress.title ? (
          <Marker
            onDragEnd={onDragEnd}
            draggable
            key={Math.random()}
            longitude={Number(geo.pickedAddress.longitude)}
            latitude={Number(geo.pickedAddress.latitude)}
          />
        ) : null}
      </InteractiveMap>
      {!!geo.pickedAddress.title && (
        <div className='address-picker__details-wrapper'>
          <div className='address-picker__details'>
            <div className='address-picker__address'>
              <LocationOnIcon />
              <span className='address-picker__address-text'>
                {geo.pickedAddress.title}
              </span>
            </div>
          </div>
          <Button
            className='button button_blue'
            variant='contained'
            disableElevation
            onClick={onAddressPick}>
            Выбрать
          </Button>
        </div>
      )}
    </Modal>
  );
};
