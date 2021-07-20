import React, { useState } from "react";

const Searching = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (input) => {
    setSearch(input);
    onSearch(input);
  };

  return (
    <input
      type="text"
      className="form-control"
      style={{ width: "240px" }}
      placeholder="Search anything"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Searching;
