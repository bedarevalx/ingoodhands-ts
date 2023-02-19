import React from 'react';
import logo from './logo.svg';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Outlet />
    </div>
  );
}

export default App;
