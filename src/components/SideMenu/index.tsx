import React from 'react';
import { ProfilePageMenuTypes } from '../../types/profileMenu.types';
import { classNamesParser } from '../../helpers/classNamesParser';
import { ProfileMenuMocks } from '../../mocks/profile-menu.mocks';
import { Link, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface ISideMenuProps {
  currentMenu: ProfilePageMenuTypes;
  classNames?: string[];
}

const SideMenu = (props: ISideMenuProps) => {
  const navigate = useNavigate();
  const handleNavigate = (to: string) => {
    navigate('/' + to);
  };
  return (
    <aside className={classNamesParser('side-menu', props.classNames)}>
      <div className=''>
        <ul className='side-menu__list'>
          {ProfileMenuMocks.map((menu) => (
            <li
              className={`side-menu__menu-item`}
              key={menu.value}
              onClick={() => handleNavigate(menu.value)}>
              <span
                className={`side-menu__link ${
                  props.currentMenu === menu.value
                    ? 'side-menu__menu-selected'
                    : ''
                }`}>
                {menu.text}
              </span>
              <NavigateNextIcon
                className={`side-menu__next-icon ${
                  props.currentMenu === menu.value
                    ? 'side-menu__menu-selected'
                    : ''
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
