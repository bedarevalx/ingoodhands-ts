import React, { useEffect } from 'react';
import { AdvertController } from '../../controllers/advert.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvertMap, AdvertPictures, Carousel, OwnerMenu } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';
import { SimilarPosts } from '../SimilarAdverts';

export const Advert = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const controller = new AdvertController(dispatch);
  const params = useParams();
  const advert = useAppSelector((state) => state.advert);
  const { user } = useAppSelector((state) => state.auth);

  const isOwner = String(advert.user?.id) === String(user.id);

  useEffect(() => {
    (async () => {
      if (params.id) {
        await controller.getAdvertById(params.id);
        controller.getSimilarPosts();
      } else {
        navigate('/404');
      }
    })();

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
              adId={advert.id}
              classNames={['advert__owner-menu']}
              isLoading={advert.isNumberLoading}
              user={advert.user}
              viewCount={advert.viewCount}
              phoneNumber={advert.phoneNumber}
              onGetContact={controller.getContacts}
              isOwner={isOwner}
            />
          </div>
          <AdvertMap
            placeName={advert.address?.title}
            classNames={['advert__map']}
            latitude={advert.address?.latitude}
            longitude={advert.address?.longitude}
          />
          <SimilarPosts similarPosts={advert.similarPosts} />
        </>
      )}
    </div>
  );
};
