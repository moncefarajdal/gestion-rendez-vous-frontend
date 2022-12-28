import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'
import TechnicianList from "./admin/technician/list-technician/list-technician";

const ClientList = lazy(() => import('./client/client-list'))
// const TechnicianList = lazy(() => import('./admin/technician/list-technician'))

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/technician`} component={lazy(() => import(`./technician/calendar`))} />
        <Route path={`${APP_PREFIX_PATH}/client`} component={ClientList} />
        <Route path={`${APP_PREFIX_PATH}/admin/technician`} component={TechnicianList} />
        <Route path={`${AUTH_PREFIX_PATH}/login`} component={lazy(() => import(`../auth-views/components/sign-in-form`))} />
        <Route path={`${AUTH_PREFIX_PATH}/register`} component={lazy(() => import(`../auth-views/components/sign-up-form`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);