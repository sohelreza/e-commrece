import React, { useEffect, useMemo, useState } from "react";

const Pagination = ({
  totalProducts = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalProducts > 0 && itemsPerPage > 0) {
      setTotalPages(
        Math.ceil(parseInt(totalProducts) / parseInt(itemsPerPage))
      );
    } else {
      setTotalPages(0);
    }
  }, [totalProducts, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          className={"page-item" + (i === currentPage ? " active" : "")}
          key={i}
          onClick={() => onPageChange(i)}
          role="button"
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  const handlePreviousButton =
    currentPage > 1 ? () => onPageChange(parseInt(currentPage) - 1) : null;

  const handleNextButton =
    currentPage < totalPages
      ? () => onPageChange(parseInt(currentPage) + 1)
      : null;

  if (totalPages === 0) return null;

  return (
    <nav>
      <ul className="pagination pagination-sm">
        <li
          className={"page-item" + (currentPage > 1 ? "" : " disabled")}
          onClick={handlePreviousButton}
          role="button"
        >
          <span className="page-link">Previous</span>
        </li>

        {paginationItems}

        <li
          className={
            "page-item" + (currentPage < totalPages ? "" : " disabled")
          }
          onClick={handleNextButton}
          role="button"
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
