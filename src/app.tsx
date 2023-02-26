import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Outlet } from 'react-router-dom';

function App() {
  //подтягиваем профиль
  useEffect(() => {}, []);
  //подтягиваем категории
  useEffect(() => {}, []);
  //подтягиваем города
  useEffect(() => {}, []);

  return (
    <div className='app'>
      <Outlet />
    </div>
  );
}

export default App;
