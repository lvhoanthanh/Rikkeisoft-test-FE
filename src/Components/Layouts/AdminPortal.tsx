import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { history } from '@store';
import _ from 'lodash';
import { Layout } from 'antd';
import TransitionLayer from './TransitionLayer';
import Sidebar from '../Sidebar';
import { UseMediaQuery } from '@hooks';
import Utils from '@/Utils';
import { ROUTERS } from '@/Constants';

const { Content } = Layout;

const layoutStyles: React.CSSProperties = {
  minHeight: '100vh',
  overflow: 'hidden',
};

const AdminPortal: React.FC = () => {
  const { isTabletOrMobile } = UseMediaQuery();
  const contentRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
   
  useEffect(() => {
    const userData = Utils.getSavedUserData();
    if(!userData) 
      history.push(ROUTERS.AUTH)
  }, []);
  
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [pathname]);

  return (
    <Layout hasSider style={layoutStyles}>
      <Sidebar
        collapsed={collapsed || isTabletOrMobile}
        onCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout>
        <Content
          ref={contentRef}
          style={{
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            padding: '2em',
            background: '#F7F7FD',
          }}
        >
          
          <TransitionLayer>
            <Outlet />
          </TransitionLayer>
        </Content>
      
      </Layout>
    </Layout>
  );
};
export default AdminPortal;
