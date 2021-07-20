import React from "react";
import { Route, Redirect } from "react-router-dom";

import { SAdminUserLayout } from "../components/sAdminUserLayout";
import { SAdminSlideMenu } from "../components/sAdminSlideMenu";

import { routesList } from "../constants";

export const SAdminPrivateRoute = ({
  component: Component,
  sAdminLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        sAdminLoggedIn ? (
          <>
            <SAdminSlideMenu />
            <SAdminUserLayout>
              <Component {...props} />
            </SAdminUserLayout>
          </>
        ) : (
          <Redirect to={routesList.S_ADMIN_LOG_IN} />
        )
      }
    />
  );
};
