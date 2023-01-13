import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Switch>
        <Route path={`${AUTH_PREFIX_PATH}/login`} component={lazy(() => import(`./authentication/sign-in`))} />
        <Route path={`${AUTH_PREFIX_PATH}/register`} component={lazy(() => import(`./authentication/sign-up`))} />
        <Route path={`${AUTH_PREFIX_PATH}/client/register`} component={lazy(() => import(`./authentication/client-register`))} />
        <Route path={`${AUTH_PREFIX_PATH}/verification`} component={lazy(() => import(`./authentication/verification`))} />
        <Redirect from={`${AUTH_PREFIX_PATH}`} to={`${AUTH_PREFIX_PATH}/login`} />
      </Switch>
    </Suspense>
  )
}

export default AppViews;

