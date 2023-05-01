import React, { useEffect } from 'react';
import { AdvertController } from '../../controllers/advert.controller';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvertMap, AdvertPictures, Carousel, OwnerMenu } from '../..';
import FullscreenSpinner from '../../../../components/FullscreenSpinner';
import { SimilarPosts } from '../SimilarAdverts';
import { IconButton } from '@mui/material';
import RequiredRole from '../../../../hoc/RequiredRole';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Advert = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const controller = new AdvertController(dispatch);
  const params = useParams();
  const advert = useAppSelector((state) => state.advert);
  const { user } = useAppSelector((state) => state.auth);
  const favorites = useAppSelector((state) => state.favorites);

  const isOwner = String(advert.user?.id) === String(user.id);
  const isFavorite = favorites.favoritesId.includes(Number(advert.id));

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
              <h3 className='advert__sub-header'>Описание</h3>
              <p className='advert__description'>{advert.description}</p>
              <h3 className='advert__sub-header'>Категория</h3>
              <p className='advert__category'>
                {advert.category?.title} {advert.category?.icon}
              </p>
              <h3 className='advert__sub-header'>Город</h3>
              <p className='advert__city'>{advert.city?.title}</p>
              <h3 className='advert__sub-header'>Дата публикации</h3>
              <p className='advert__city'>{advert.createdAt}</p>
              <RequiredRole>
                <IconButton
                  // onClick={handleAddToFavorite}
                  className='advert__favorite-btn'>
                  <FavoriteIcon
                    className={`advert__favorite-icon ${
                      isFavorite ? 'favorited' : ''
                    }`}
                  />
                </IconButton>
              </RequiredRole>
              <IconButton></IconButton>
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
