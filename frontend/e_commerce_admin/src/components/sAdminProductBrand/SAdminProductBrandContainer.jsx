import React, { Component } from "react";
import { connect } from "react-redux";

import { SAdminProductBrandAdd } from "./SAdminProductBrandAdd";
import { SAdminProductBrandDetails } from "./SAdminProductBrandDetails";
import { SAdminProductBrandEdit } from "./SAdminProductBrandEdit";
import { SAdminProductBrandList } from "./SAdminProductBrandList";
import SAdminProductBrandNavbar from "./SAdminProductBrandNavbar";

const pages = [
  "Brand List",
  "Add Brand",
  "Brand Details",
  "Edit Brand Details",
];

class SAdminProductBrandContainer extends Component {
  render() {
    const { selectedTab } = this.props;

    return (
      <div className="App mt-4">
        <SAdminProductBrandNavbar tabs={pages}>
          {selectedTab === "Add Brand" && <SAdminProductBrandAdd />}

          {selectedTab === "Brand List" && <SAdminProductBrandList />}

          {selectedTab === "Brand Details" && <SAdminProductBrandDetails />}

          {selectedTab === "Edit Brand Details" && <SAdminProductBrandEdit />}
        </SAdminProductBrandNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedTab = state.sAdminProductBrandReducer.selectedTab;

  return {
    selectedTab,
  };
};

const connectedSAdminProductBrandContainer = connect(mapStateToProps)(
  SAdminProductBrandContainer
);

export { connectedSAdminProductBrandContainer as SAdminProductBrandContainer };
