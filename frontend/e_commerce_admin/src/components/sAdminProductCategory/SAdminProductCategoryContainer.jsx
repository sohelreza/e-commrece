import React, { Component } from "react";
import { connect } from "react-redux";

import { SAdminProductCategoryAdd } from "./SAdminProductCategoryAdd";
import { SAdminProductCategoryDetails } from "./SAdminProductCategoryDetails";
import { SAdminProductCategoryEdit } from "./SAdminProductCategoryEdit";
import { SAdminProductCategoryList } from "./SAdminProductCategoryList";
import SAdminProductCategoryNavbar from "./SAdminProductCategoryNavbar";

const pages = [
  "Category List",
  "Add Category",
  "Category Details",
  "Edit Category Details",
];

class SAdminProductCategoryContainer extends Component {
  render() {
    const { selectedTab } = this.props;

    return (
      <div className="App mt-4">
        <SAdminProductCategoryNavbar tabs={pages}>
          {selectedTab === "Add Category" && <SAdminProductCategoryAdd />}

          {selectedTab === "Category List" && <SAdminProductCategoryList />}

          {selectedTab === "Category Details" && (
            <SAdminProductCategoryDetails />
          )}

          {selectedTab === "Edit Category Details" && (
            <SAdminProductCategoryEdit />
          )}
        </SAdminProductCategoryNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedTab = state.sAdminProductCategoryReducer.selectedTab;

  return {
    selectedTab,
  };
};

const connectedSAdminProductCategoryContainer = connect(mapStateToProps)(
  SAdminProductCategoryContainer
);

export { connectedSAdminProductCategoryContainer as SAdminProductCategoryContainer };
