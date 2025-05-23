import { Router } from 'express';
import { AuthRoutes } from '../module/Auth/auth.route';
import { UserRoutes } from '../module/User/user.route';
import { AdminRoutes } from '../module/Admin/admin.route';
import { CustomerRoutes } from '../module/Customer/customer.route';
import { ServicesRoutes } from '../module/Services/services.route';
import { SlotRoutes } from '../module/Slot/slot.route';

const middleWareRouter = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/customer',
    route: CustomerRoutes,
  },
  {
    path: '/service',
    route: ServicesRoutes,
  },
  {
    path: '/slot',
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => middleWareRouter.use(route.path, route.route));

export const MiddlewareRoutes = middleWareRouter;
