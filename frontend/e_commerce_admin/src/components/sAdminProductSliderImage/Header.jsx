import React, { useState } from "react";

import { uniqueId } from "../../helperFunctions";

import { BsArrowDown, BsArrowUp } from "react-icons/bs";
// import * as FaIcons from "react-icons/fa";

const Header = ({ tableHeaders, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (apiField) => {
    const order =
      apiField === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(apiField);
    setSortingOrder(order);
    onSorting(apiField, order);
  };

  return (
    <thead className="thead-dark">
      <tr>
        {tableHeaders.map(({ headerName, apiField, sortable }) => (
          <th
            scope="col"
            key={uniqueId.id()}
            onClick={() => (sortable ? onSortingChange(apiField) : null)}
            role={sortable ? "button" : ""}
          >
            {headerName}
            {sortingField &&
              sortingField === apiField &&
              (sortingOrder === "asc" ? <BsArrowDown /> : <BsArrowUp />)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
