import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import _ from 'lodash';
import { Menu, Layout } from 'antd';
import { useSelector } from 'react-redux';

import { NAVIGATION_LIST } from '@constants';
import Utils from '@utils';
import { RootState, useTypedDispatch } from '@store';
import { ROLES } from '@enums';
import { logout } from '@/Redux/Authentication/Authentication.action';

interface ISidebarProps {
  collapsed: boolean;
  onCollapsed(): void;
}

const {
  ADMIN_SIDEBAR,
  USER_SIDEBAR,
  ROUTE_HAS_FUNCTION,
} = NAVIGATION_LIST;

const Sidebar: React.FC<ISidebarProps> = ({
  collapsed,
}: ISidebarProps) => {
  // Constructors
  const dispatch = useTypedDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const selfProfile: any = useSelector((state: RootState) =>
    _.get(state.AUTHENTICATION, 'selfProfile'),
  );
  const userRole = Utils.getUserRole();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const resolvePathname = id ? pathname.replace(id, ':id') : pathname;
    const isHasFunc = _.includes(ROUTE_HAS_FUNCTION, resolvePathname);
    if (!isHasFunc) setSelectedKeys([resolvePathname]);
  }, [pathname]);

  const sidebarList = useMemo(() => {
    if (userRole === ROLES.ADMIN) return ADMIN_SIDEBAR;
    if (userRole === ROLES.USER)
      return USER_SIDEBAR;
    return [];
  }, [selfProfile]);

  return (
    <Layout.Sider
      style={{ background: 'white' }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
    >
      <Menu
        selectedKeys={selectedKeys}
        items={sidebarList}
        mode="inline"
        style={{ marginTop: '1em' }}
        onSelect={(e) => navigate(e.key)}
      />
      <div style={{
        display: 'flex',
        padding: '10px',
        fontSize:'12px',
        cursor: 'pointer',
        fontWeight: 'bold',
        background: '#ccc',
        margin: '10px',
        placeContent: 'center'
      }}
        onClick={() => dispatch(logout())}>
        Logout
      </div>
    </Layout.Sider>
  );
};
export default Sidebar;
