import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import AdPreview from '../AdPreview';
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll';
import { AdsController } from '../../controllers/ads.controller';

interface IAdPreviewListProps {
  classNames?: string[];
}

export const AdPreviewList = (props: IAdPreviewListProps) => {
  const ads = useAppSelector((state) => state.ads);
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
      {ads.isLoading && <Spinner />}
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
            loadMoreCallback={
              i === ads.ads.length - 1 ? loadMoreCallback : null
            }
            handleAddToFavorite={adsController.addToFavorites}
            handleRemoveFromFavorite={adsController.removeFromFavorites}
            isFavorite={ad.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
