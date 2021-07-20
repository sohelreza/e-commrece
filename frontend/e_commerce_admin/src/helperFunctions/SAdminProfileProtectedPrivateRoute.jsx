import React from "react";
import { Route, Redirect } from "react-router-dom";

import SAdminSlideMenu from "../Components/SAdminSlideMenu/SAdminSlideMenu";
import SAdminUserLayout from "../Components/SAdminUserLayout/SAdminUserLayout";

import { routesList } from "../Constants/routesList";

const SAdminProfileProtectedPrivateRoute = ({
  component: Component,
  sAdminLoggedIn,
  sAdminProfile,
  ...rest
}) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        sAdminLoggedIn && sAdminProfile ? (
          <>
            <SAdminSlideMenu />
            <SAdminUserLayout>
              <Component {...props} />
            </SAdminUserLayout>
          </>
        ) : (
          <Redirect to={routesList.S_ADMIN_UPDATE_PROFILE} />
        )
      }
    />
  );
};

export default SAdminProfileProtectedPrivateRoute;
