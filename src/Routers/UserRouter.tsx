import { ROUTERS } from '@constants';
import { UserPages } from '@pages';
import ProtectedRoute from './ProtectedRouter';
import { AdminPortal } from '@layouts';

const UserRouters = {
  element: (
      <AdminPortal />
  ),
  children: [
    {
      path: ROUTERS.USER_CATEGORY,
      element: (
        <ProtectedRoute location={ROUTERS.USER_CATEGORY}>
          <UserPages.Category />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.USER_PRODUCT,
      element: (
        <ProtectedRoute location={ROUTERS.USER_PRODUCT}>
          <UserPages.Product />
        </ProtectedRoute>
      ),
    },
  ],
};

export default UserRouters;
