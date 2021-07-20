import React, { Component } from "react";
import { connect } from "react-redux";

import { SAdminProductSliderImageAdd } from "./SAdminProductSliderImageAdd";
import { SAdminProductSliderImageDetails } from "./SAdminProductSliderImageDetails";
import { SAdminProductSliderImageEdit } from "./SAdminProductSliderImageEdit";
import { SAdminProductSliderImageList } from "./SAdminProductSliderImageList";
import SAdminProductSliderImageNavbar from "./SAdminProductSliderImageNavbar";

const pages = [
  "Slider Image List",
  "Add Slider Image",
  "Slider Image Details",
  "Edit Slider Image Details",
];

class SAdminProductSliderImageContainer extends Component {
  render() {
    const { selectedTab } = this.props;

    return (
      <div className="App mt-4">
        <SAdminProductSliderImageNavbar tabs={pages}>
          {selectedTab === "Add Slider Image" && (
            <SAdminProductSliderImageAdd />
          )}

          {selectedTab === "Slider Image List" && (
            <SAdminProductSliderImageList />
          )}

          {selectedTab === "Slider Image Details" && (
            <SAdminProductSliderImageDetails />
          )}

          {selectedTab === "Edit Slider Image Details" && (
            <SAdminProductSliderImageEdit />
          )}
        </SAdminProductSliderImageNavbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectedTab = state.sAdminProductSliderImageReducer.selectedTab;

  return {
    selectedTab,
  };
};

const connectedSAdminProductSliderImageContainer = connect(mapStateToProps)(
  SAdminProductSliderImageContainer
);

export { connectedSAdminProductSliderImageContainer as SAdminProductSliderImageContainer };
