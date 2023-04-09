import React from 'react';

interface IUserAdProps {
  classNames?: string[];
  title?: string;
  description?: string;
  viewCount?: number;
  favoriteCount?: number;
  imagePath?: string;
  likeCount?: number;
  id: number;
}

const UserAd = (props: IUserAdProps) => {
  return (
    <div className='user-ad'>
      <img className='user-ad__image' src={props.imagePath} alt='' />
      <div className='user-ad__info'>
        <h4>{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default UserAd;
