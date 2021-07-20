import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductBrandChangeTab } from "../../redux";

class SAdminProductBrandNavbar extends Component {
  render() {
    const {
      tabs,
      selectedTab,
      sAdminProductBrandChangeTab,
      children,
    } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <ul className="nav nav-tabs">
          {tabs.map((tab) => {
            const disabled =
              (tab === "Brand Details" && selectedTab !== "Brand Details") ||
              (tab === "Edit Brand Details" &&
                selectedTab !== "Edit Brand Details")
                ? " disabled"
                : "";
            const active = tab === selectedTab ? " active " : "";

            return (
              <li className="nav-item" key={tab}>
                <button
                  className={"nav-link" + active + disabled}
                  onClick={() => sAdminProductBrandChangeTab(tab)}
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
  const selectedTab = state.sAdminProductBrandReducer.selectedTab;

  return {
    selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductBrandChangeTab: (tabName) =>
      dispatch(sAdminProductBrandChangeTab(tabName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductBrandNavbar);
