import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { routes } from './routes';
import 'moment/locale/ru';
import 'mapbox-gl/dist/mapbox-gl.css';
import './styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';

const container = document.getElementById('root')!;
const root = createRoot(container);
moment().locale('ru');

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
);
