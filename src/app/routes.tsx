import { createBrowserRouter, Navigate } from 'react-router';
import { MainLayout } from './components/layouts/MainLayout';
import { AuthLayout } from './components/layouts/AuthLayout';
import { Login } from './components/auth/Login';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { Dashboard } from './components/Dashboard';
import { ProductDetail } from './components/ProductDetail';
import { ProductionPlan } from './components/ProductionPlan';
import { QualityControl } from './components/QualityControl';
import { DeliveryTracking } from './components/DeliveryTracking';
import { SalesOrders } from './components/SalesOrders';
import { CustomerDebtDetail } from './components/CustomerDebtDetail';
import { Approval } from './components/Approval';
import { Profile } from './components/Profile';
import { ChangePassword } from './components/ChangePassword';
import { CreateOrder } from './components/CreateOrder';
import { ApprovalDetail } from './components/ApprovalDetail';
import { CreateApprovalRequest } from './components/CreateApprovalRequest';
import { Notifications } from './components/Notifications';
import { MasterData } from './components/MasterData';
import { SecurityCheck } from './components/SecurityCheck';

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { index: true, Component: Login },
      { path: 'login', Component: Login },
      { path: 'forgot-password', Component: ForgotPassword },
    ],
  },
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'master-data', Component: MasterData },
      { path: 'master-data/customers', Component: MasterData },
      { path: 'master-data/products', Component: MasterData },
      { path: 'master-data/documents', Component: MasterData },
      { path: 'customers', element: <Navigate to="/master-data/customers" replace /> },
      { path: 'products', element: <Navigate to="/master-data/products" replace /> },
      { path: 'customers/:id/debt', Component: CustomerDebtDetail },
      { path: 'sales', Component: SalesOrders },
      { path: 'sales/create', Component: CreateOrder },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'production', Component: ProductionPlan },
      { path: 'production/quality', Component: QualityControl },
      { path: 'approval', Component: Approval },
      { path: 'approval/:id', Component: ApprovalDetail },
      { path: 'approval/create', Component: CreateApprovalRequest },
      { path: 'delivery', Component: DeliveryTracking },
      { path: 'security', Component: SecurityCheck },
      { path: 'profile', Component: Profile },
      { path: 'profile/change-password', Component: ChangePassword },
      { path: 'notifications', Component: Notifications },
    ],
  },
]);
