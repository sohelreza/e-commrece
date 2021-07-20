import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSubcategoryChangeTab } from "../../redux";

class SAdminProductSubcategoryNavbar extends Component {
  render() {
    const {
      tabs,
      selectedTab,
      sAdminProductSubcategoryChangeTab,
      children,
    } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <ul className="nav nav-tabs">
          {tabs.map((tab) => {
            const disabled =
              (tab === "Subcategory Details" &&
                selectedTab !== "Subcategory Details") ||
              (tab === "Edit Subcategory Details" &&
                selectedTab !== "Edit Subcategory Details")
                ? " disabled"
                : "";
            const active = tab === selectedTab ? " active " : "";

            return (
              <li className="nav-item" key={tab}>
                <button
                  className={"nav-link" + active + disabled}
                  onClick={() => sAdminProductSubcategoryChangeTab(tab)}
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
  const selectedTab = state.sAdminProductSubcategoryReducer.selectedTab;

  return {
    selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSubcategoryChangeTab: (tabName) =>
      dispatch(sAdminProductSubcategoryChangeTab(tabName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSubcategoryNavbar);
