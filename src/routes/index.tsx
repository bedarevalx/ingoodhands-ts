import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../app';
// import PrivateRoute from '../components/PrivateRoute';
// import { GROUP_NAMES } from '../constants/groups';
import { lazy, Suspense } from 'react';
// import HomePage from '../pages/HomePage';
import { ROUTES } from '../constants/routes';
import PrivateRoute from '../hoc/PrivateRoute';
import FullscreenSpinner from '../components/FullscreenSpinner';

const EditAdvertPage = lazy(() => import('../pages/EditAdvertPage'));
const HomePage = lazy(() => import('../pages/HomePage'));

//Auth Feature
const SignInPage = lazy(() => import('../pages/SignInPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const RecoverPasswordPage = lazy(() => import('../pages/RecoverPasswordPage'));

//Profile Feature
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'));
const MyAdsPage = lazy(() => import('../pages/MyAdsPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));

const AdvertPage = lazy(() => import('../pages/AdvertPage'));

//Admin Feature
const AdminPage = lazy(() => import('../pages/AdminPage'));
const PendingPage = lazy(() => import('../pages/PendingPage'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const CitiesPage = lazy(() => import('../pages/CitiesPage'));
const CategoriesPage = lazy(() => import('../pages/CategoriesPage'));
const AdsSearchPage = lazy(() => import('../pages/AdsSearchPage'));
const ModerationPage = lazy(() => import('../pages/ModerationPage'));
const DealsPage = lazy(() => import('../pages/DealsPage'));
const ReservationsPage = lazy(() => import('../pages/ReservationsPage'));

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
          {
            path: ROUTES.DEALS,
            element: <PrivateRoute children={<DealsPage />} />,
          },
          {
            path: ROUTES.RESERVATIONS,
            element: <PrivateRoute children={<ReservationsPage />} />,
          },
        ],
      },
      {
        path: ROUTES.SIGNIN,
        element: <PrivateRoute children={<SignInPage />} reverseAuth />,
      },
      {
        path: ROUTES.NEW_AD,
        element: (
          <PrivateRoute children={<EditAdvertPage key={'edit-page'} />} />
        ),
      },
      {
        path: `${ROUTES.EDIT}/:id`,
        element: (
          <PrivateRoute
            children={<EditAdvertPage key={'new-ad-page'} isEditing={true} />}
          />
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: <PrivateRoute children={<SignUpPage />} reverseAuth />,
      },
      {
        path: ROUTES.RECOVER_PASSWORD,
        element: (
          <PrivateRoute children={<RecoverPasswordPage />} reverseAuth />
        ),
      },
      {
        path: `${ROUTES.POST}/:id`,
        element: <AdvertPage />,
      },
      {
        path: ROUTES.CONFIRM_EMAIL,
        element: (
          <Suspense fallback={<FullscreenSpinner />}>
            <div>CONFIRM EMAIL</div>
          </Suspense>
        ),
      },
      {
        path: ROUTES.ADMIN,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <PrivateRoute
                requiredRole={'moderator'}
                children={<AdminPage />}
              />
            ),
          },
          {
            path: ROUTES.PENDING,
            element: (
              <PrivateRoute
                requiredRole={'moderator'}
                children={<PendingPage />}
              />
            ),
          },
          {
            path: ROUTES.CATEGORIES,
            element: (
              <PrivateRoute
                requiredRole={'admin'}
                children={<CategoriesPage />}
              />
            ),
          },
          {
            path: ROUTES.CITIES,
            element: (
              <PrivateRoute requiredRole={'admin'} children={<CitiesPage />} />
            ),
          },
          {
            path: ROUTES.ADS_SEARCH,
            element: (
              <PrivateRoute
                children={
                  <PrivateRoute requiredRole={'admin'}>
                    <AdsSearchPage />
                  </PrivateRoute>
                }
              />
            ),
          },
          {
            path: `${ROUTES.MODERATION}/:id`,
            element: (
              <PrivateRoute
                requiredRole={'moderator'}
                children={<ModerationPage />}
              />
            ),
          },
          {
            path: ROUTES.USERS,
            element: (
              <PrivateRoute requiredRole={'admin'} children={<UsersPage />} />
            ),
          },
        ],
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]);
