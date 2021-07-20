import React from "react";
import { Route, Redirect } from "react-router-dom";

import { routesList } from "../constants";

export const SAdminPublicRoute = ({
  component: Component,
  restricted,
  sAdminLoggedIn,
  apiLoaded,
  ...rest
}) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        sAdminLoggedIn && restricted ? (
          !apiLoaded ? (
            <Redirect to={routesList.S_ADMIN_DASHBOARD} />
          ) : (
            <Redirect to={routesList.S_ADMIN_DASHBOARD} />
          )
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
