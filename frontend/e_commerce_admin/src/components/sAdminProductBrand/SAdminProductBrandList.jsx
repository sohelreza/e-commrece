import React, { useEffect, useMemo, useState } from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import { BiDetail, BiEdit } from "react-icons/bi";
// import { RiDeleteBin3Line } from "react-icons/ri";

import Header from "./Header";
import Pagination from "./Pagination";
import Searching from "./Searching";

import { getFormattedToken, uniqueId } from "../../helperFunctions";

import UseFullPageLoader from "../../hooks/UseFullPageLoader";

import { itemsPerPageOptions } from "../../constants";

import { sAdminProductBrandApi } from "../../api";

import {
  sAdminProductBrandChangeTab,
  sAdminProductBrandIdSet,
  sAdminProductBrandListSetScrollPosition,
} from "../../redux";

import "./sAdminProductBrand.css";

const SAdminProductBrandList = (props) => {
  // different properties for individual column in the brand table
  const tableHeaders = [
    {
      headerName: "Brand",
      apiField: "name",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Action",
      apiField: "",
      sortable: false,
      searchable: false,
      isNumber: false,
    },
  ];

  // dynamically adding column object and column field name
  let searchableFieldObject = [];
  let searchableFieldName = [];
  tableHeaders.forEach((header) => {
    if (header.searchable) {
      searchableFieldObject.push(header);
      searchableFieldName.push(header.apiField);
    }
  });

  const dropdownItemsPerPage = itemsPerPageOptions;

  const [allBrands, setAllBrands] = useState([]); // all data from the api
  const [totalBrands, setTotalBrands] = useState(0); // number of data after computation
  const [currentPage, setCurrentPage] = useState(1); // current page no
  const [search, setSearch] = useState(""); // search field text
  const [sorting, setSorting] = useState({ apiField: "", order: "" }); //sorting field name in the api and order of sorting
  const [itemsPerPage, setItemsPerPage] = useState(10); // number of data in the page
  const [searchableField] = useState(searchableFieldName); // field name in the api where search can be applied
  // const [dropdownField] = useState(searchableFieldObject); // searchable field name for the advanced search in the dropdown
  const [loader, showLoader, hideLoader] = UseFullPageLoader();

  useEffect(() => {
    const getAllBrands = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();

      sAdminProductBrandApi
        .sAdminGetProductBrandList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllBrands(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const brandsData = useMemo(() => {
    let computedBrands = allBrands;

    if (search) {
      computedBrands = computedBrands.filter((brand) => {
        // if the field is searchable, then searching
        let searchFound = false;

        for (const property in brand) {
          if (searchableField.includes(property)) {
            searchFound =
              searchFound ||
              brand[property]
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());
          }
        }

        return searchFound;
      });
    }

    setTotalBrands(computedBrands.length);

    // sorting brands list
    if (sorting.apiField) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedBrands = computedBrands.sort((a, b) => {
        // sorting for number type value
        if (!isNaN(a[sorting.apiField])) {
          return (
            parseInt(reversed) * (a[sorting.apiField] - b[sorting.apiField])
          );
        } else {
          // sorting for non number value
          return (
            parseInt(reversed) *
            a[sorting.apiField].localeCompare(b[sorting.apiField])
          );
        }
      });
    }

    // current page slice
    const startIndex = (parseInt(currentPage) - 1) * parseInt(itemsPerPage);
    const endIndex =
      (parseInt(currentPage) - 1) * parseInt(itemsPerPage) +
      parseInt(itemsPerPage);

    const data = computedBrands.slice(startIndex, endIndex);

    const computedData = {
      data,
      startIndex,
      endIndex: parseInt(endIndex) - parseInt(itemsPerPage) + data.length,
      totalData: computedBrands.length,
    };

    return computedData;
  }, [allBrands, currentPage, search, sorting, itemsPerPage, searchableField]);

  // const onChangeDropdown = (dropdownField) => {
  //   let changedSearchableField = [];

  //   dropdownField.forEach((header) => {
  //     if (header.searchable) {
  //       changedSearchableField.push(header.apiField);
  //     }

  //     setSearchableField(changedSearchableField);
  //     setCurrentPage(1);
  //   });
  // };

  // const onRemoveDropdown = (dropdownField) => {
  //   if (!dropdownField.length) {
  //     setSearchableField(searchableFieldName);
  //     setCurrentPage(1);
  //   } else {
  //     let changedSearchableField = [];

  //     dropdownField.forEach((header) => {
  //       if (header.searchable) {
  //         changedSearchableField.push(header.apiField);
  //       }

  //       setSearchableField(changedSearchableField);

  //       setCurrentPage(1);
  //     });
  //   }
  // };

  // console.log("check api data", allBrands);

  const {
    sAdminProductBrandChangeTab,
    sAdminProductBrandListSetScrollPosition,
    sAdminProductBrandIdSet,
  } = props;

  return (
    <>
      <p className="h1 m-4">Product Brands List</p>

      <div className="row w-100">
        <div className="col mb-0 col-12 text center">
          <div className="row mb-2">
            <div className="col-md-4">
              <div className="row">
                <p className="col-md-5">Records Per Page</p>

                <select
                  className="custom-select col-md-4"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(e.target.value);
                    setCurrentPage(1);
                  }}
                  role="button"
                >
                  {dropdownItemsPerPage.map((data) => (
                    <option key={data.value} value={data.value}>
                      {data.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-2 d-flex flex-row-reverse">
              <Searching
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* <div className="col-md-6 d-flex flex-row-reverse">
              <Multiselect
                options={dropdownField}
                displayValue={"headerName"}
                onSelect={onChangeDropdown}
                onRemove={onRemoveDropdown}
                emptyRecordMsg={"No column available"}
                placeholder={"Search by column"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
              />
            </div> */}
          </div>

          <table className="table table-hover table-bordered">
            <Header
              tableHeaders={tableHeaders}
              onSorting={(apiField, order) => setSorting({ apiField, order })}
            />

            <tbody>
              {brandsData.data.map((data) => {
                const { _id, name } = data;

                return (
                  <tr key={uniqueId.id()}>
                    <td className="align-middle">{name}</td>

                    <td className="align-middle">
                      <ul className="product-category-icon">
                        <li
                          className="d-inline-block p-2 btn read-icon"
                          onClick={() => {
                            sAdminProductBrandChangeTab("Brand Details");
                            sAdminProductBrandIdSet(_id);
                            sAdminProductBrandListSetScrollPosition(
                              window.pageXOffset,
                              window.pageYOffset
                            );
                          }}
                        >
                          <BiDetail size={30} title="See details" />
                        </li>

                        <li
                          className="d-inline-block p-2 btn update-icon"
                          onClick={() => {
                            sAdminProductBrandChangeTab("Edit Brand Details");
                            sAdminProductBrandIdSet(_id);
                            sAdminProductBrandListSetScrollPosition(
                              window.pageXOffset,
                              window.pageYOffset
                            );
                          }}
                        >
                          <BiEdit size={30} title="Edit details" />
                        </li>

                        {/* <li className="d-inline-block p-2">
                        <RiDeleteBin3Line size={30} title="Delete brand" />
                      </li> */}
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="row">
            <div className="col-md-6">
              <Pagination
                totalBrands={totalBrands}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>

        <p className="text-muted ml-3">
          {brandsData.totalData ? (
            <>
              Showing {parseInt(brandsData.startIndex) + 1} to{" "}
              {brandsData.endIndex} from {brandsData.totalData} entries
            </>
          ) : (
            <>No Data Available</>
          )}
        </p>
      </div>

      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const positionX = state.sAdminProductBrandReducer.productBrandListPositionX;
  const positionY = state.sAdminProductBrandReducer.productBrandListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductBrandChangeTab: (tabName) =>
      dispatch(sAdminProductBrandChangeTab(tabName)),
    sAdminProductBrandIdSet: (id) => dispatch(sAdminProductBrandIdSet(id)),
    sAdminProductBrandListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminProductBrandListSetScrollPosition(positionX, positionY)),
  };
};

const connectedSAdminProductBrandList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductBrandList);

export { connectedSAdminProductBrandList as SAdminProductBrandList };
