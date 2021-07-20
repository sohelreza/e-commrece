import React, { useState } from "react";
import Loader from "./Loader";

const UseFullPageLoader = () => {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <Loader /> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default UseFullPageLoader;
