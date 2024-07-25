import { Outlet } from 'react-router';
import { ROUTERS } from '@constants';
import { AuthenticationPages } from '@pages';

const LandingRouters = {
  element: (
      <Outlet></Outlet>
  ),
  children: [
    {
      path: ROUTERS.AUTH,
      element: <AuthenticationPages.SignIn />,
    },
    {
      path: ROUTERS.HOME,
      element: <AuthenticationPages.SignIn />,
    },
  ],
};

export default LandingRouters;
