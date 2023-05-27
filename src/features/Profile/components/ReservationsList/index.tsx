import React, { useEffect, useState } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import {
  Menu,
  MenuItem,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { ReservationController, ReservationItem } from '../..';
import { ReservationsFilters } from '../../../../mocks/reservations-filters.mocks';
import Spinner from '../../../../UI/Spinner';
import NotFoundItems from '../../../../components/NotFoundItems';

interface IReservationsListProps {
  classNames?: string[];
}

export const ReservationsList = (props: IReservationsListProps) => {
  const reservations = useAppSelector((state) => state.reservations);
  const dispatch = useAppDispatch();
  const controller = new ReservationController(dispatch);

  useEffect(() => {
    controller.getReservations();

    return () => {
      controller.clearValues();
    };
  }, []);

  const getNotFoundParamTitle = () => {
    if (reservations.param === 'incoming') {
      return 'входящих';
    } else {
      return 'исходящих';
    }
  };

  return (
    <div className={classNamesParser('reservations-list', props.classNames)}>
      <div className='reservations-list__header'>
        <h3 className='reservations-list__title'>Бронирования</h3>
      </div>
      <ToggleButtonGroup
        value={reservations.param}
        exclusive
        onChange={controller.handleReservationParamsChange}
        className='reservations-list__filters'>
        {ReservationsFilters.map((filter) => (
          <ToggleButton
            className='reservations-list__filter-btn'
            id={filter.value}
            value={filter.value}>
            {filter.title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {reservations.isLoading && <Spinner />}
      {!reservations.isLoading && reservations.reservations.length === 0 && (
        <NotFoundItems
          classNames={['reservations-list__list']}
          icon='😔'
          text={`У вас еще нет ${getNotFoundParamTitle()} запросов на бронирование`}
        />
      )}
      <div className='reservations-list__list'>
        {reservations.reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            title={reservation.post.title}
            userName={
              reservations.param === 'incoming'
                ? reservation.user.name
                : reservation.post.user.name
            }
            adCreatedDate={reservation.post.date}
            description={reservation.post.description}
            image={reservation.post.imagePath}
            date={reservation.createdAt}
            id={reservation.id}
            variant={reservations.param}
            days={reservation.days}
            onConfirmReservation={controller.handleConfirmReservation}
            onDeclineReservation={controller.handleDeclineReservation}
            address={'г. Барнаул ул. Речная 25'}
            postId={reservation.post.id}
          />
        ))}
        <div className='reservations-list__pagination-wrapper'>
          <Pagination
            count={reservations.totalPages}
            page={reservations.page}
            onChange={controller.handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
