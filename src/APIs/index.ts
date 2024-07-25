import * as AuthApi from './Authentication.api';
import * as CategoryApi from './Category.api';
import * as UsersApi from './Users.api';
import * as ProductApi from './Product.api';

export default {
  ...AuthApi,
  ...CategoryApi,
  ...UsersApi,
  ...ProductApi
};
