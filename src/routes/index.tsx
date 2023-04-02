import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../app';
// import PrivateRoute from '../components/PrivateRoute';
// import { GROUP_NAMES } from '../constants/groups';
import { lazy, Suspense } from 'react';
// import HomePage from '../pages/HomePage';
import { ROUTES } from '../constants/routes';
import PrivateRoute from '../hoc/PrivateRoute';
import FullscreenSpinner from '../components/FullscreenSpinner';
// import SignUpPage from '../pages/SignUpPage';
// import SignInPage from '../pages/SignInPage';
// import EditAdvertPage from '../pages/EditAdvertPage';
// import Ad from '../pages/Ad';
// import AdsListPage from '../pages/Ads';
// import FullscreenSpinner from '../components/FullscreenSpinner';
// import ConfirmEmailPage from '../pages/ConfirmEmail';

const EditAdvertPage = lazy(() => import('../pages/EditAdvertPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const SignInPage = lazy(() => import('../pages/SignInPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'));
const MyAdsPage = lazy(() => import('../pages/MyAdsPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));

const Loading = () => <div>Loading</div>;

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<FullscreenSpinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<FullscreenSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PrivateRoute children={<ProfilePage />} />,
          },
          {
            path: ROUTES.MY_ADS,
            element: <PrivateRoute children={<MyAdsPage />} />,
          },
          {
            path: ROUTES.REVIEWS,
            element: <PrivateRoute children={<ReviewsPage />} />,
          },
          {
            path: ROUTES.FAVORTIES,
            element: <PrivateRoute children={<FavoritesPage />} />,
          },
        ],
      },
      {
        path: ROUTES.SIGNIN,
        element: <PrivateRoute children={<SignInPage />} reverseAuth />,
      },
      {
        path: ROUTES.NEW_AD,
        element: <PrivateRoute children={<EditAdvertPage />} />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <PrivateRoute children={<SignUpPage />} reverseAuth />,
      },
      {
        path: ROUTES.CONFIRM_EMAIL,
        element: (
          <Suspense fallback={<Loading />}>
            <div>CONFIRM EMAIL</div>
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]);
