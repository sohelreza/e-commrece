import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSliderImageChangeTab } from "../../redux";

class SAdminProductSliderImageNavbar extends Component {
  render() {
    const { tabs, selectedTab, sAdminProductSliderImageChangeTab, children } =
      this.props;

    return (
      <div style={{ width: "100%" }}>
        <ul className="nav nav-tabs">
          {tabs.map((tab) => {
            const disabled =
              (tab === "Slider Image Details" &&
                selectedTab !== "Slider Image Details") ||
              (tab === "Edit Slider Image Details" &&
                selectedTab !== "Edit Slider Image Details")
                ? " disabled"
                : "";
            const active = tab === selectedTab ? " active " : "";

            return (
              <li className="nav-item" key={tab}>
                <button
                  className={"nav-link" + active + disabled}
                  onClick={() => sAdminProductSliderImageChangeTab(tab)}
                >
                  {tab}
                </button>
              </li>
            );
          })}
        </ul>

        {children}
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

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSliderImageChangeTab: (tabName) =>
      dispatch(sAdminProductSliderImageChangeTab(tabName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSliderImageNavbar);
