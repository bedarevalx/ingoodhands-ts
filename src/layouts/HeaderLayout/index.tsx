import React, { ReactNode, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { classNamesParser } from '../../helpers/classNamesParser';
import { useMediaQuery } from '@mui/material';
import { MEDIA } from '../../constants/app';
import { MobileHeader } from '../../components/MobileHeader';

interface IHeaderLayoutProps {
  children: ReactNode;
  classNames?: string[];
  menuType?: 'profile' | 'admin-panel';
}

const HeaderLayout = (props: IHeaderLayoutProps) => {
  const matchSm = useMediaQuery(`(max-width:${MEDIA.SM}px`);
  console.log(matchSm);

  return (
    <div className='header-layout'>
      <MobileHeader
        classNames={['header-layout__mobile-header']}
        menuType={props.menuType}
      />
      <Header classNames={['header-layout__header']} />
      <div
        className={classNamesParser(
          'container header-layout__container',
          props.classNames,
        )}>
        <main className='header-layout__main'>{props.children}</main>
      </div>
      <Footer classNames={['header-layout__footer']} />
    </div>
  );
};

export default HeaderLayout;
