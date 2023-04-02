import React from 'react';
import { ProfilePageMenuTypes } from '../../types/profileMenu.types';
import { classNamesParser } from '../../helpers/classNamesParser';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';
import { Link } from 'react-router-dom';

interface ISideMenuProps {
  currentMenu: ProfilePageMenuTypes;
  classNames?: string[];
}

const SideMenu = (props: ISideMenuProps) => {
  const handleMenuClick = (target: string) => {};
  return (
    <aside className={classNamesParser('side-menu', props.classNames)}>
      <ul className='side-menu__list'>
        {ProfileMenuMocks.map((menu) => (
          <li className={`side-menu__menu-item`} key={menu.value}>
            <Link
              className={`side-menu__link ${
                props.currentMenu === menu.value
                  ? 'side-menu__menu-selected'
                  : ''
              }`}
              to={'/' + menu.value}>
              {menu.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
