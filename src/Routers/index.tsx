import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes, useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider, ThemeConfig } from 'antd';
import { hot } from 'react-hot-loader/root';

import { store, persistor } from '@store';
import AuthenticationRouters from './AuthenticationRouter';
import SystemAdminRouters from './SystemAdminRouter';
import SubscriberRouter from './UserRouter';

const App = () => {
  const elements = useRoutes([
    AuthenticationRouters,
    SystemAdminRouters,
    SubscriberRouter,
  ]);
  return elements;
};

const RedirectApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname.includes('index.html')) navigate('/');
    window.redirect = navigate;

  }, []);

  return null;
};

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Montserrat',
    colorText: '#545454',
  },
  components: {
    Button: {
      fontWeight: 700,
    },
    Breadcrumb: {
      fontSize: 15,
    },
  },
};

const Root = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ConfigProvider theme={theme}>
            <RedirectApp />
            <App />
          </ConfigProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default hot(Root);
