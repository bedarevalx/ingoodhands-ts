import React, { useEffect } from 'react';
import { AdvertController } from '../../controllers/advert.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvertMap, AdvertPictures, Carousel, OwnerMenu } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';

export const Advert = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const controller = new AdvertController(dispatch);
  const params = useParams();
  const advert = useAppSelector((state) => state.advert);

  useEffect(() => {
    if (params.id) controller.getAdvertById(params.id);
    else {
      navigate('/404');
    }

    return () => {
      controller.clearState();
    };
  }, []);

  return (
    <div className='advert'>
      {/* //TODO: Доделать отображение спиннера нормально */}
      {advert.isLoading ? (
        <FullscreenSpinner />
      ) : (
        <>
          <AdvertPictures
            images={advert.imageSet}
            classNames={['advert__carousel']}
          />
          <div className='advert__main-info'>
            <div className='advert__advert-info'>
              <h2 className='advert__title'>{advert.title}</h2>
              <p className='advert__title'>{advert.description}</p>
              <p>{advert.address?.title}</p>
            </div>
            <OwnerMenu
              classNames={['advert__owner-menu']}
              user={advert.user}
              viewCount={advert.viewCount}
            />
          </div>
          <AdvertMap classNames={['advert__map']} />
        </>
      )}
    </div>
  );
};
