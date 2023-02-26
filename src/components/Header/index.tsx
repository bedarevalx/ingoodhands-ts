import React from 'react';

interface IHeaderProps {
  classNames: string[];
}

const Header = (props: IHeaderProps) => {
  return (
    <header className='header'>
      <div className='container header__container'>index</div>
    </header>
  );
};

export default Header;
