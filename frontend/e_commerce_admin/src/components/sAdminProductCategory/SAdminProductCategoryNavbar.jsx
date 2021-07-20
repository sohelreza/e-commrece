import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductCategoryChangeTab } from "../../redux";

class SAdminProductCategoryNavbar extends Component {
  render() {
    const {
      tabs,
      selectedTab,
      sAdminProductCategoryChangeTab,
      children,
    } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <ul className="nav nav-tabs">
          {tabs.map((tab) => {
            const disabled =
              (tab === "Category Details" &&
                selectedTab !== "Category Details") ||
              (tab === "Edit Category Details" &&
                selectedTab !== "Edit Category Details")
                ? " disabled"
                : "";
            const active = tab === selectedTab ? " active " : "";

            return (
              <li className="nav-item" key={tab}>
                <button
                  className={"nav-link" + active + disabled}
                  onClick={() => sAdminProductCategoryChangeTab(tab)}
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
  const selectedTab = state.sAdminProductCategoryReducer.selectedTab;

  return {
    selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductCategoryChangeTab: (tabName) =>
      dispatch(sAdminProductCategoryChangeTab(tabName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductCategoryNavbar);
