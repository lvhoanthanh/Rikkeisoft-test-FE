import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga';

import 'react-toastify/dist/ReactToastify.css';
import 'rc-texty/assets/index.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import './rsuite.css';
import './index.css';

import Root from './Routers';

document.title = import.meta.env.VITE_APP_TITLE || '';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<Root />);

if (import.meta.env.VITE_GA_TRACKING_ID)
  ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
