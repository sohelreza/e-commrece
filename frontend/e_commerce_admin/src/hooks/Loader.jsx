import React from "react";

import Spinner from "../assets/gif/spinner.gif";

import "./loader.css";

const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default FullPageLoader;
