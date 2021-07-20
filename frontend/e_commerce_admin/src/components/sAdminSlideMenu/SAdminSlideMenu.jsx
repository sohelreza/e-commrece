import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { connect } from "react-redux";

import { sAdminLogout, sAdminToggleMenu } from "../../redux";

import { sAdminSlideMenuData } from "../../constants";

import "./sAdminSlideMenu.css";

class SAdminSlideMenu extends Component {
  render() {
    const { toggleMenu, isMenuOpen, logOut, apiLoaded } = this.props;

    return apiLoaded ? (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={toggleMenu} />
            </Link>
          </div>

          <nav className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              <li className="navbar-toggle" onClick={toggleMenu}>
                <Link to="#" className="close-menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              {sAdminSlideMenuData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path} activeClassName="selected">
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}

              <span className="logout-style" onClick={logOut}>
                Logout
              </span>
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    apiLoaded: state.sAdminLoginReducer.apiLoaded,
    isMenuOpen: state.sAdminSlideMenuReducer.isMenuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(sAdminLogout()),
    toggleMenu: () => dispatch(sAdminToggleMenu()),
  };
};

const connectedSAdminSlideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminSlideMenu);

export { connectedSAdminSlideMenu as SAdminSlideMenu };
