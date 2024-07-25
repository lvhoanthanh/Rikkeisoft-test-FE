import { ROUTERS } from '@constants';
import { SystemAdminPages } from '@pages';
import ProtectedRoute from './ProtectedRouter';
import { AdminPortal } from '@layouts';

const SystemAdminRouters = {
  element: (
      <AdminPortal />
  ),
  children: [
    {
      path: ROUTERS.ADMIN_CATEGORY,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_CATEGORY}>
          <SystemAdminPages.Categories.CategoryList />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.ADMIN_CREATE_CATEGORY,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_CREATE_CATEGORY}>
          <SystemAdminPages.Categories.CreateCategory />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.ADMIN_UPDATE_CATEGORY,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_UPDATE_CATEGORY}>
          <SystemAdminPages.Categories.UpdateCategory />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.ADMIN_PRODUCT,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_PRODUCT}>
          <SystemAdminPages.Products.ProductList />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.ADMIN_UPDATE_PRODUCT,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_UPDATE_PRODUCT}>
          <SystemAdminPages.Products.UpdateProduct />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTERS.ADMIN_CREATE_PRODUCT,
      element: (
        <ProtectedRoute location={ROUTERS.ADMIN_CREATE_PRODUCT}>
          <SystemAdminPages.Products.CreateProduct />
        </ProtectedRoute>
      ),
    },
  ],
};

export default SystemAdminRouters;
