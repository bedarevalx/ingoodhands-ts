import React from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import { useAppSelector } from '../../../../hooks/useRedux';
import Spinner from '../../../../UI/Spinner';
import AdPreview from '../AdPreview';

interface IAdPreviewListProps {
  classNames?: string[];
}

export const AdPreviewList = (props: IAdPreviewListProps) => {
  const ads = useAppSelector((state) => state.ads);
  return (
    <div className={classNamesParser('ad-preview-list', props.classNames)}>
      {ads.isLoading && <Spinner />}
      <div className='ad-preview-list__grid-container'>
        {ads.ads?.map((ad) => (
          <AdPreview
            key={ad.id}
            title={ad.title}
            description={ad.descripton}
            imagePath={ad.imagePath}
            date={ad.date}
          />
        ))}
      </div>
    </div>
  );
};
