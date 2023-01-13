import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import PrivateRoute from '../../services/PrivateRoute'
import PrivateClientRoute from "services/PrivateClientRoute";
import TechnicianList from "./admin/technician/list-technician/list-technician";
import SuccursaleList from "./super-admin/succursale/list-succursale/list-succursale";
const ClientList = lazy(() => import('./client/client-list'))
// const TechnicianList = lazy(() => import('./admin/technician/list-technician'))

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <PrivateRoute path={`${APP_PREFIX_PATH}/technician`} component={lazy(() => import(`./technician/calendrier`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/client`} component={ClientList} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/technicien/client/add-client`} component={lazy(() => import(`./utils/add/add-client`))}  />
        <PrivateRoute path={`${APP_PREFIX_PATH}/admin/technician/list-technician`} component={TechnicianList} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/admin/technician/add-technician`} component={lazy(() => import(`./admin/technician/add-technician`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/super-admin/succursale/list-succursale`} component={SuccursaleList} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/super-admin/succursale/add-succursale`} component={lazy(() => import(`./super-admin/succursale/add-succursale`))} />
        {/* <PrivateRoute path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} /> */}
        <PrivateClientRoute path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);