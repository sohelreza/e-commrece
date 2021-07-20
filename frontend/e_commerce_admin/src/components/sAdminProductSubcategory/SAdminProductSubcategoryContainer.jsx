import React, { Component } from "react";
import { connect } from "react-redux";

import { SAdminProductSubcategoryAdd } from "./SAdminProductSubcategoryAdd";
import { SAdminProductSubcategoryDetails } from "./SAdminProductSubcategoryDetails";
import { SAdminProductSubcategoryEdit } from "./SAdminProductSubcategoryEdit";
import { SAdminProductSubcategoryList } from "./SAdminProductSubcategoryList";
import SAdminProductSubcategoryNavbar from "./SAdminProductSubcategoryNavbar";

const pages = [
  "Subcategory List",
  "Add Subcategory",
  "Subcategory Details",
  "Edit Subcategory Details",
];

class SAdminProductSubcategoryContainer extends Component {
  render() {
    const { selectedTab } = this.props;

    return (
      <div className="App mt-4">
        <SAdminProductSubcategoryNavbar tabs={pages}>
          {selectedTab === "Add Subcategory" && <SAdminProductSubcategoryAdd />}

          {selectedTab === "Subcategory List" && (
            <SAdminProductSubcategoryList />
          )}

          {selectedTab === "Subcategory Details" && (
            <SAdminProductSubcategoryDetails />
          )}

          {selectedTab === "Edit Subcategory Details" && (
            <SAdminProductSubcategoryEdit />
          )}
        </SAdminProductSubcategoryNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedTab = state.sAdminProductSubcategoryReducer.selectedTab;

  return {
    selectedTab,
  };
};

const connectedSAdminProductSubcategoryContainer = connect(mapStateToProps)(
  SAdminProductSubcategoryContainer
);

export { connectedSAdminProductSubcategoryContainer as SAdminProductSubcategoryContainer };
