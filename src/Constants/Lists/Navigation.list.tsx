import Routers from '../Routers';
import { Avatar } from 'antd';


const ADMIN_SIDEBAR = [
 
  {
    label: 'Product',
    key: Routers.ADMIN_PRODUCT,
    icon: (
      <Avatar
        shape="square"
        src="https://img.icons8.com/?size=100&id=aR2Ar4o65ts7&format=png&color=000000"
        size={20}
      />
    ),
  },
  {
    label: 'Category',
    key: Routers.ADMIN_CATEGORY,
    icon: (
      <Avatar
        shape="square"
        src="https://img.icons8.com/?size=100&id=YXWkZzb4J3aD&format=png&color=000000"
        size={20}
      />
    ),
  },
];

const USER_SIDEBAR = [
  {
    label: 'Product',
    key: Routers.USER_PRODUCT,
    icon: (
      <Avatar
        shape="square"
        src="https://img.icons8.com/?size=100&id=aR2Ar4o65ts7&format=png&color=000000"
        size={20}
      />
    ),
  },
  {
    label: 'Category',
    key: Routers.USER_CATEGORY,
    icon: (
      <Avatar
        shape="square"
        src="https://img.icons8.com/?size=100&id=YXWkZzb4J3aD&format=png&color=000000"
        size={20}
      />
    ),
  },

];

const ROUTE_HAS_FUNCTION = [
  Routers.ADMIN_CREATE_CATEGORY,
  Routers.ADMIN_UPDATE_CATEGORY,

  Routers.ADMIN_CREATE_PRODUCT,
  Routers.ADMIN_UPDATE_PRODUCT,
];

export default {
  ADMIN_SIDEBAR,
  ROUTE_HAS_FUNCTION,
  USER_SIDEBAR,
};
