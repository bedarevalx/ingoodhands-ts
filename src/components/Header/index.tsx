import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../features/Auth';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Button from '../../UI/Button';
import ProfileButton from '../ProfileButton';
import { ReactComponent as Logo } from '../../assets/vector/logo-white.svg';
import HeaderBg from '../../assets/vector/header-bg.svg';
import { classNamesParser } from '../../helpers/classNamesParser';

interface IHeaderProps {
  classNames: string[];
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const authService = new AuthService(dispatch);

  const handlePlaceAdClick = () => {
    navigate('/new-ad');
  };

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <header
      className={classNamesParser('header', props.classNames)}

      // style={{ backgroundImage: `url('${HeaderBg}')`, backgroundSize: '' }}
    >
      <div className='container header__container'>
        <Logo className='header__logo' onClick={handleLogoClick} />
        <div className='header__buttons'>
          <ProfileButton
            classNames={['header__profile-button']}
            isAuthenticate={auth.isAuthenticate}
            userName={auth.user.name}
            onSignOut={authService.signOut}
          />
          <Button
            classNames={['header__place-ad']}
            onClick={handlePlaceAdClick}>
            Разместить объявление
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
