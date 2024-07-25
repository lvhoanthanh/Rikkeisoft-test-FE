import _ from 'lodash';
import { ROLES } from './Enums';
import Routers from './Routers';

const { ADMIN, USER } = ROLES;

const generatePermisions = (
    roles: ROLES[],
): { allowed: ROLES[]; notAllowed: ROLES[] } => {
    return {
        allowed: roles,
        notAllowed: _.filter(ROLES, (el) => !_.includes(roles, el)),
    };
};

const ROLE_PERMISSIONS: {
    [key: string]: { allowed: ROLES[]; notAllowed: ROLES[] };
} = {
    // For admin
    [Routers.ADMIN_CATEGORY]: generatePermisions([ADMIN]),
    [Routers.ADMIN_CREATE_CATEGORY]: generatePermisions([ADMIN]),
    [Routers.ADMIN_UPDATE_CATEGORY]: generatePermisions([ADMIN]),
    [Routers.ADMIN_PRODUCT]: generatePermisions([ADMIN]),
    [Routers.ADMIN_CREATE_PRODUCT]: generatePermisions([ADMIN]),
    [Routers.ADMIN_UPDATE_PRODUCT]: generatePermisions([ADMIN]),

    // FOR user
    [Routers.USER_CATEGORY]: generatePermisions([USER]),
    [Routers.USER_PRODUCT]: generatePermisions([USER]),
};

export { ROLE_PERMISSIONS };
