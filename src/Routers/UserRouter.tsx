import { ROUTERS } from '@constants';
import { UserPages } from '@pages';
import ProtectedRoute from './ProtectedRouter';
import { AdminPortal } from '@layouts';

const SalerRouters = {
  element: (
      <AdminPortal />
  ),
  children: [
    {
      path: ROUTERS.USER_CATEGORY,
      element: (
        <ProtectedRoute location={ROUTERS.USER_CATEGORY}>
          <UserPages.Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.USER_PRODUCT,
      element: (
        <ProtectedRoute location={ROUTERS.USER_PRODUCT}>
          <UserPages.Dashboard />
        </ProtectedRoute>
      ),
    },
  ],
};

export default SalerRouters;
