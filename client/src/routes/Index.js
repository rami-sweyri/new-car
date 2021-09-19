import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import ProtectedRoute from './ProtectedRoute';
const Auth = lazy(() => import('../pages/Auth'));
const Index = lazy(() => import('../pages/Index'));
const Users = lazy(() => import('../pages/users/Index'));
const UsersCrud = lazy(() => import('../pages/users/UsersCrud'));
const Services = lazy(() => import('../pages/services/Index'));
const ServicesCrud = lazy(() => import('../pages/services/ServicesCrud'));
const Plans = lazy(() => import('../pages/plans/Index'));
const PlansCrud = lazy(() => import('../pages/plans/PlansCrud'));
const Roles = lazy(() => import('../pages/roles/Index'));
const RolesCrud = lazy(() => import('../pages/roles/rolesCrud'));
const permissions = lazy(() => import('../pages/permissions/Index'));
const permissionsCrud = lazy(() =>
  import('../pages/permissions/permissionsCrud')
);
const City = lazy(() => import('../pages/city/Index'));
const CityCrud = lazy(() => import('../pages/city/CityCrud'));
const Buildings = lazy(() => import('../pages/buildings/Index'));
const BuildingsCrud = lazy(() => import('../pages/buildings/BuildingsCrud'));
const Orders = lazy(() => import('../pages/orders/Index'));
// const OrdersCrud = lazy(() => import("../pages/orders/OrdersCrud"));
const ScheduledWashes = lazy(() => import('../pages/scheduledWashes/Index'));
const ScheduledWashesCrud = lazy(() =>
  import('../pages/scheduledWashes/ScheduledWashesCrud')
);
const Intro = lazy(() => import('../pages/intro/Index'));
const IntroCrud = lazy(() => import('../pages/intro/IntroCrud'));
const Home = lazy(() => import('../pages/Home'));

const Routes = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin/auth' component={Auth} />
        <ProtectedRoute exact path='/admin/' component={Index} />

        {/* start User mangment */}
        <ProtectedRoute exact path='/admin/users' component={Users} />
        <ProtectedRoute
          exact
          path='/admin/users/:id/edit'
          component={UsersCrud}
        />
        <ProtectedRoute exact path='/admin/users/new' component={UsersCrud} />
        {/* end User mangment */}

        {/* start Services mangment */}
        <ProtectedRoute exact path='/admin/services' component={Services} />
        <ProtectedRoute
          exact
          path='/admin/services/:id/edit'
          component={ServicesCrud}
        />
        <ProtectedRoute
          exact
          path='/admin/services/new'
          component={ServicesCrud}
        />
        {/* end Services mangment */}

        {/* start User mangment */}
        <ProtectedRoute exact path='/admin/plans' component={Plans} />
        <ProtectedRoute
          exact
          path='/admin/plans/:id/edit'
          component={PlansCrud}
        />
        <ProtectedRoute exact path='/admin/plans/new' component={PlansCrud} />
        {/* end User mangment */}

        {/* start Roles mangment */}
        <ProtectedRoute exact path='/admin/roles' component={Roles} />
        <ProtectedRoute
          exact
          path='/admin/roles/:id/edit'
          component={RolesCrud}
        />
        <ProtectedRoute exact path='/admin/roles/new' component={RolesCrud} />
        {/* end Roles mangment */}

        {/* start Permissions mangment */}
        <ProtectedRoute
          exact
          path='/admin/permissions'
          component={permissions}
        />
        <ProtectedRoute
          exact
          path='/admin/permissions/:id/edit'
          component={permissionsCrud}
        />
        <ProtectedRoute
          exact
          path='/admin/permissions/new'
          component={permissionsCrud}
        />

        {/* end Permissions mangment */}

        {/* start City mangment */}
        <ProtectedRoute exact path='/admin/city' component={City} />
        <ProtectedRoute
          exact
          path='/admin/city/:id/edit'
          component={CityCrud}
        />
        <ProtectedRoute exact path='/admin/city/new' component={CityCrud} />
        {/* end City mangment */}

        {/* start Buildings mangment */}
        <ProtectedRoute exact path='/admin/buildings' component={Buildings} />
        <ProtectedRoute
          exact
          path='/admin/buildings/:id/edit'
          component={BuildingsCrud}
        />
        <ProtectedRoute
          exact
          path='/admin/buildings/new'
          component={BuildingsCrud}
        />
        {/* end Buildings mangment */}

        {/* start Orders mangment */}
        <ProtectedRoute exact path='/admin/orders' component={Orders} />
        {/* <ProtectedRoute exact path="/orders/:id/edit" component={OrdersCrud} />
        <ProtectedRoute exact path="/orders/new" component={OrdersCrud} /> */}
        {/* end Orders mangment */}

        {/* Start scheduled a Washes mangment */}
        <ProtectedRoute
          exact
          path='/admin/scheduledWashes'
          component={ScheduledWashes}
        />
        <ProtectedRoute
          exact
          path='/admin/scheduledWashes/:id/edit'
          component={ScheduledWashesCrud}
        />
        <ProtectedRoute
          exact
          path='/admin/scheduledWashes/new'
          component={ScheduledWashesCrud}
        />
        {/* end scheduled a Washes mangment */}

        {/* Start Intro mangment */}
        <ProtectedRoute exact path='/admin/intro' component={Intro} />
        <ProtectedRoute
          exact
          path='/admin/intro/:id/edit'
          component={IntroCrud}
        />
        <ProtectedRoute exact path='/admin/intro/new' component={IntroCrud} />
        {/* end Intro mangment */}
      </Switch>
    </Suspense>
  );
};

export default Routes;
