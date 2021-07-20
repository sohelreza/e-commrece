import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { SAdminDashboard } from "./components/sAdminDashboard";
import { SAdminError } from "./components/sAdminError";
import { SAdminLogin } from "./components/sAdminLogin";
import { SAdminProductContainer } from "./components/sAdminProduct";
import { SAdminProductBrandContainer } from "./components/sAdminProductBrand";
import { SAdminProductCategoryContainer } from "./components/sAdminProductCategory";
import { SAdminProductSliderImageContainer } from "./components/sAdminProductSliderImage";
import { SAdminProductSubcategoryContainer } from "./components/sAdminProductSubcategory";

import { SAdminPublicRoute, SAdminPrivateRoute } from "./helperFunctions";

import { routesList } from "./constants";

import "./App.css";

class App extends Component {
  render() {
    const {
      sAdminLoggedIn,
      apiLoaded,
      // sAdminProfile
    } = this.props;

    return (
      // <Router history={history}>
      <Router>
        <Switch>
          {/* <Route path="/" exact component={SAdminLogin} /> */}

          <SAdminPublicRoute
            restricted={true}
            apiLoaded={apiLoaded}
            sAdminLoggedIn={sAdminLoggedIn}
            component={SAdminLogin}
            path="/"
            exact
          />

          <SAdminPublicRoute
            restricted={true}
            apiLoaded={apiLoaded}
            sAdminLoggedIn={sAdminLoggedIn}
            component={SAdminLogin}
            path={routesList.S_ADMIN_LOG_IN} // /s-admin-login
            exact
          />

          {/* <SAdminProfileProtectedPrivateRoute
            component={SAdminProfile}
            sAdminLoggedIn={sAdminLoggedIn}
            sAdminProfile={sAdminProfile}
            path={routesList.S_ADMIN_PROFILE} // /profile
            exact
          /> */}

          <SAdminPrivateRoute
            component={SAdminDashboard}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_DASHBOARD} // /s-admin-dashboard
            exact
          />

          <SAdminPrivateRoute
            component={SAdminProductCategoryContainer}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PRODUCT_CATEGORY} // /s-admin-product-category
            exact
          />

          <SAdminPrivateRoute
            component={SAdminProductSubcategoryContainer}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PRODUCT_SUBCATEGORY} // /s-admin-product-subcategory
            exact
          />

          <SAdminPrivateRoute
            component={SAdminProductBrandContainer}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PRODUCT_BRAND} // /s-admin-product-brand
            exact
          />

          <SAdminPrivateRoute
            component={SAdminProductContainer}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PRODUCT} // /s-admin-product
            exact
          />

          <SAdminPrivateRoute
            component={SAdminProductSliderImageContainer}
            sAdminLoggedIn={sAdminLoggedIn}
            path={routesList.S_ADMIN_PRODUCT_SLIDER_IMAGE} // /s-admin-product-slider-image
            exact
          />

          <Route component={SAdminError} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const sAdminLoggedIn = state.sAdminLoginReducer.loggedIn;
  const apiLoaded = state.sAdminLoginReducer.apiLoaded;
  const sAdminProfile = 3;

  return {
    sAdminLoggedIn,
    apiLoaded,
    sAdminProfile,
  };
}

export default connect(mapStateToProps)(App);
