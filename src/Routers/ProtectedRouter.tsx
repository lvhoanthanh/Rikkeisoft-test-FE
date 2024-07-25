import React, { useEffect } from 'react';
import _ from 'lodash';
import { Navigate, useLocation } from 'react-router';
import { ROUTERS } from '@constants';
import Utils from '@utils';
import { PermissionDenied } from '@/Components/ErrorComponents';
interface ISectionProps {
  children: JSX.Element;
  location: string;
}

// Declare actions
const ProtectedRoute: React.FC<ISectionProps> = ({ children, location }) => {
  // Constructors
  const pathname = useLocation().pathname;
  const userRole = Utils.getUserRole();

  useEffect(() => {
  }, []);

  if (!userRole)
    return <Navigate to={`${ROUTERS.AUTH}?redirect=${pathname}`} replace />;

  const canAccessRouter = Utils.checkRouterAccess(location);
  if (!canAccessRouter) return <PermissionDenied />;

  return children;
};

export default ProtectedRoute;
