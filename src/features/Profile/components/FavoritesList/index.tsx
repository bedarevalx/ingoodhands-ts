import React, { useEffect } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { Pagination } from '@mui/material';
import Spinner from '../../../../UI/Spinner';
import UserAd from '../UserAd';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { FavoritesController } from '../../controllers/favorites.controller';

export interface IFavoritesListProps {
  classNames?: string[];
}

export const FavoritesList = (props: IFavoritesListProps) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const favoritesController = new FavoritesController(dispatch);
  useEffect(() => {
    favoritesController.getMyAds();

    return () => {
      favoritesController.clearValues();
    };
  }, []);

  return (
    <div className={classNamesParser('favorites-list', props.classNames)}>
      <h3 className='favorites-list__title'>Избранное</h3>
      <div className='favorites-list__list'>
        {favorites.isLoading && <Spinner />}
        {!favorites.isLoading && favorites.ads.length === 0 ? (
          <p>Список избранного пуст</p>
        ) : null}
        {!favorites.isLoading &&
          favorites.ads.map((ad) => (
            <UserAd
              key={ad.id}
              id={ad.id}
              title={ad.title}
              description={ad.description}
              imagePath={ad.imagePath}
              placeName={ad.address}
              variant={'favorites'}
              city={ad.city}
              date={ad.date}
              category={ad.category}
              isFavorited={ad.isFavorited}
              handleFavoriteClick={favoritesController.handleFavoriteClick}
            />
          ))}
        <div className='favorites-list__pagination-wrapper'>
          <Pagination
            page={favorites.page}
            count={favorites.totalPages}
            onChange={favoritesController.handlePageChange}
            className='favorites-list__pagination'
          />
        </div>
      </div>
    </div>
  );
};
