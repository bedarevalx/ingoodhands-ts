import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import { AdPreview } from '../..';
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll';
import { AdsController } from '../../controllers/ads.controller';
import SkeletonLoader from '../../../../components/SkeletonLoader';
import { Skeleton } from '@mui/material';
import NotFoundItems from '../../../../components/NotFoundItems';

interface IAdPreviewListProps {
  classNames?: string[];
}

export const AdPreviewList = (props: IAdPreviewListProps) => {
  const ads = useAppSelector((state) => state.ads);
  const favorites = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const adsController = new AdsController(dispatch);
  const { loadMoreCallback } = useInfiniteScroll(
    adsController.fetchAds,
    ads.isLoading,
    adsController.setIsLoading,
    ads.isLastPage,
    ads.ads,
    ads.page,
  );

  return (
    <div className={classNamesParser('ad-preview-list', props.classNames)}>
      {!ads.isLoading && ads.ads.length === 0 && (
        <div className='ad-preview-list__not-found'>
          <NotFoundItems icon='🥲' text='Ничего не найдено' />
        </div>
      )}

      <div className='ad-preview-list__grid-container'>
        {ads.ads?.map((ad, i) => (
          <AdPreview
            key={ad.id}
            id={ad.id}
            title={ad.title}
            description={ad.descripton}
            imagePath={ad.imagePath}
            date={ad.date}
            city={ad.city}
            handleAddToFavorite={adsController.addToFavorites}
            handleRemoveFromFavorite={adsController.removeFromFavorites}
            isFavorite={favorites.favoritesId.includes(ad.id)}
          />
        ))}
        <>
          {!ads.isLastPage &&
            new Array(10).fill(null).map((_: any, i: number) => (
              <div
                key={i}
                className='ad-preview-list__skeleton-wrapper'
                ref={i === 0 ? loadMoreCallback : null}>
                <Skeleton className='ad-preview-list__skeleton' />
              </div>
            ))}
        </>
      </div>
    </div>
  );
};
