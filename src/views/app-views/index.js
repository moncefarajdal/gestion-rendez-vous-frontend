import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import TechnicianList from "./admin/technician/list-technician/list-technician";
import SuccursaleList from "./super-admin/succursale/list-succursale/list-succursale";
const ClientList = lazy(() => import('./client/client-list'))
// const TechnicianList = lazy(() => import('./admin/technician/list-technician'))

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/technician`} component={lazy(() => import(`./technician/calendar`))} />
        <Route path={`${APP_PREFIX_PATH}/client`} component={ClientList} />
        <Route path={`${APP_PREFIX_PATH}/admin/technician/list-technician`} component={TechnicianList} />
        <Route path={`${APP_PREFIX_PATH}/admin/technician/add-technician`} component={lazy(() => import(`./admin/technician/add-technician`))} />
        <Route path={`${APP_PREFIX_PATH}/super-admin/succursale`} component={SuccursaleList} />
        <Route path={`${APP_PREFIX_PATH}/super-admin/succursale/add-succursale`} component={lazy(() => import(`./super-admin/succursale/add-succursale`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);