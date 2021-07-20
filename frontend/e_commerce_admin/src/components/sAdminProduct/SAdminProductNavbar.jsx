import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductChangeTab } from "../../redux";

class SAdminProductNavbar extends Component {
  render() {
    const { tabs, selectedTab, sAdminProductChangeTab, children } = this.props;

    return (
      <div style={{ width: "100%" }}>
        <ul className="nav nav-tabs">
          {tabs.map((tab) => {
            const disabled =
              (tab === "Product Details" &&
                selectedTab !== "Product Details") ||
              (tab === "Edit Product Details" &&
                selectedTab !== "Edit Product Details")
                ? " disabled"
                : "";
            const active = tab === selectedTab ? " active " : "";

            return (
              <li className="nav-item" key={tab}>
                <button
                  className={"nav-link" + active + disabled}
                  onClick={() => sAdminProductChangeTab(tab)}
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
  const selectedTab = state.sAdminProductReducer.selectedTab;

  return {
    selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductChangeTab: (tabName) =>
      dispatch(sAdminProductChangeTab(tabName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductNavbar);
