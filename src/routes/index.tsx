import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../app';
// import PrivateRoute from '../components/PrivateRoute';
// import { GROUP_NAMES } from '../constants/groups';
import { lazy, Suspense } from 'react';
import HomePage from '../pages/HomePage';
import { ROUTES } from '../constants/routes';
import PrivateRoute from '../hoc/PrivateRoute';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
// import Ad from '../pages/Ad';
// import AdsListPage from '../pages/Ads';
// import FullscreenSpinner from '../components/FullscreenSpinner';
// import ConfirmEmailPage from '../pages/ConfirmEmail';

// const AdCategoryPage = lazy(() => import('../pages/AdCategory'));
// const EditAd = lazy(() => import('../pages/EditAd'));
// const AdsPage = lazy(() => import('../pages/NewAds'));
// const Home = lazy(() => import('../pages/Home'));
// const SignInPage = lazy(() => import('../pages/SignIn'));
// const SignUpPage = lazy(() => import('../pages/SignUp'));
// const NotFoundPage = lazy(() => import('../pages/404'));
// const UserAdsPage = lazy(() => import('../pages/UserAds'));
// const FavoritesPage = lazy(() => import('../pages/Favorites'));
// const NotificationPage = lazy(() => import('../pages/Notification'));
// const MessagesPreviewPage = lazy(() => import('../pages/MessagesPreview'));
// const MessagesPage = lazy(() => import('../pages/Messages'));
// const ProfileSettingsPage = lazy(() => import('../pages/ProfileSettings'));
// const AdsSearchPage = lazy(() => import('../pages/AdsSearch'));

const Loading = () => <div>Loading</div>;

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      //   {
      //     path: GROUP_NAMES.NEW_ADS,
      //     element: <Outlet />,
      //     children: [
      //       {
      //         index: true,
      //         element: <PrivateRoute children={<AdsPage />} />,
      //       },
      //       {
      //         path: ':group',
      //         element: <Outlet />,
      //         children: [
      //           {
      //             index: true,
      //             element: <PrivateRoute children={<AdCategoryPage />} />,
      //           },
      //           {
      //             path: ':subGroup',
      //             element: <Outlet />,
      //             children: [
      //               {
      //                 index: true,
      //                 element: <PrivateRoute children={<EditAd />} />,
      //               },
      //               {
      //                 path: 'preview/:id',
      //                 element: <PrivateRoute children={<Ad />} />,
      //               },
      //               {
      //                 path: 'edit/:id',
      //                 element: <PrivateRoute children={<EditAd />} />,
      //               },
      //             ],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      {
        path: ROUTES.SIGNIN,
        element: <PrivateRoute children={<SignInPage />} reverseAuth />,
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
