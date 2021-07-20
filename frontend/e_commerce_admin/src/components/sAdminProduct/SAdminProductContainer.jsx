import React, { Component } from "react";
import { connect } from "react-redux";

import { SAdminProductAdd } from "./SAdminProductAdd";
import { SAdminProductDetails } from "./SAdminProductDetails";
import { SAdminProductEdit } from "./SAdminProductEdit";
import { SAdminProductList } from "./SAdminProductList";
import SAdminProductNavbar from "./SAdminProductNavbar";

const pages = [
  "Product List",
  "Add Product",
  "Product Details",
  "Edit Product Details",
];

class SAdminProductContainer extends Component {
  render() {
    const { selectedTab } = this.props;

    return (
      <div className="mt-4">
        <SAdminProductNavbar tabs={pages}>
          {selectedTab === "Add Product" && <SAdminProductAdd />}

          {selectedTab === "Product List" && <SAdminProductList />}

          {selectedTab === "Product Details" && <SAdminProductDetails />}

          {selectedTab === "Edit Product Details" && <SAdminProductEdit />}
        </SAdminProductNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedTab = state.sAdminProductReducer.selectedTab;

  return {
    selectedTab,
  };
};

const connectedSAdminProductContainer = connect(mapStateToProps)(
  SAdminProductContainer
);

export { connectedSAdminProductContainer as SAdminProductContainer };
