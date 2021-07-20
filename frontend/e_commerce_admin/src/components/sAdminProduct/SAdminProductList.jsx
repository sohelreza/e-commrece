import React, { useEffect, useMemo, useState } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import { BiDetail, BiEdit } from "react-icons/bi";
// import { RiDeleteBin3Line } from "react-icons/ri";

import Header from "./Header";
import Pagination from "./Pagination";
import Searching from "./Searching";

import { getFormattedToken, uniqueId } from "../../helperFunctions";

import UseFullPageLoader from "../../hooks/UseFullPageLoader";

import { sAdminProductApi } from "../../api";

import { itemsPerPageOptions } from "../../constants";

import {
  sAdminProductChangeTab,
  sAdminProductIdSet,
  sAdminProductListSetScrollPosition,
} from "../../redux";

import "./sAdminProduct.css";

const SAdminProductList = (props) => {
  // different properties for individual column in the category table
  const tableHeaders = [
    {
      headerName: "Product",
      apiField: "name",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Category",
      apiField: "categoryName", // this apiField is an custom property, created by loop through the api data
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Subcategory",
      apiField: "subcategoryName", // this apiField is an custom property, created by loop through the api data
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Brand",
      apiField: "brandName", // this apiField is an custom property, created by loop through the api data
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Unit",
      apiField: "unit",
      sortable: true,
      searchable: true,
      isNumber: false,
    },
    {
      headerName: "Price",
      apiField: "price",
      sortable: true,
      searchable: true,
      isNumber: true,
    },
    {
      headerName: "Discount",
      apiField: "discountPercentage", // this apiField is an custom property, created by loop through the api data
      sortable: true,
      searchable: true,
      isNumber: true,
    },
    {
      headerName: "In Stock",
      apiField: "stock",
      sortable: true,
      searchable: true,
      isNumber: true,
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

  const [allProducts, setAllProducts] = useState([]); // all data from the api
  const [totalProducts, setTotalProducts] = useState(0); // number of data after computation
  const [currentPage, setCurrentPage] = useState(1); // current page no
  const [search, setSearch] = useState(""); // search field text
  const [sorting, setSorting] = useState({ apiField: "", order: "" }); //sorting field name in the api and order of sorting
  const [itemsPerPage, setItemsPerPage] = useState(10); // number of data in the page
  const [searchableField, setSearchableField] = useState(searchableFieldName); // field name in the api where search can be applied
  const [dropdownField] = useState(searchableFieldObject); // searchable field name for the advanced search in the dropdown
  const [loader, showLoader, hideLoader] = UseFullPageLoader();

  useEffect(() => {
    const getAllProducts = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();

      sAdminProductApi.sAdminGetProductList(formattedToken).then((response) => {
        hideLoader();

        response.data.forEach((product) => {
          product.categoryName = product.category.name;
          product.subcategoryName = product.subcategory.name;
          product.brandName =
            product.brand && product.brand.name ? product.brand.name : "N/A";
          product.discountPercentage =
            product.offer && product.offer.discountPercentage
              ? product.offer.discountPercentage
              : 0;
        });

        // console.log("products data", response.data);
        setAllProducts(response.data);
        window.scrollTo(positionX, positionY);
      });
    };

    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsData = useMemo(() => {
    let computedProducts = allProducts;

    if (search) {
      computedProducts = computedProducts.filter((product) => {
        // if the field is searchable, then searching
        let searchFound = false;

        for (const property in product) {
          if (searchableField.includes(property)) {
            searchFound =
              searchFound ||
              product[property]
                .toString()
                .toLowerCase()
                .includes(search.toLowerCase());
          }
        }

        return searchFound;
      });
    }

    setTotalProducts(computedProducts.length);

    // sorting categories list
    if (sorting.apiField) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedProducts = computedProducts.sort((a, b) => {
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

    const data = computedProducts.slice(startIndex, endIndex);

    const computedData = {
      data,
      startIndex,
      endIndex: parseInt(endIndex) - parseInt(itemsPerPage) + data.length,
      totalData: computedProducts.length,
    };

    return computedData;
  }, [
    allProducts,
    currentPage,
    search,
    sorting,
    itemsPerPage,
    searchableField,
  ]);

  const onChangeDropdown = (dropdownField) => {
    let changedSearchableField = [];

    dropdownField.forEach((header) => {
      if (header.searchable) {
        changedSearchableField.push(header.apiField);
      }

      setSearchableField(changedSearchableField);
      setCurrentPage(1);
    });
  };

  const onRemoveDropdown = (dropdownField) => {
    if (!dropdownField.length) {
      setSearchableField(searchableFieldName);
      setCurrentPage(1);
    } else {
      let changedSearchableField = [];

      dropdownField.forEach((header) => {
        if (header.searchable) {
          changedSearchableField.push(header.apiField);
        }

        setSearchableField(changedSearchableField);

        setCurrentPage(1);
      });
    }
  };

  // console.log("check data", allProducts);

  const {
    sAdminProductChangeTab,
    sAdminProductListSetScrollPosition,
    sAdminProductIdSet,
  } = props;

  return (
    <>
      <p className="h1 m-4">Product List</p>

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

            <div className="col-md-6 d-flex flex-row-reverse">
              <Multiselect
                options={dropdownField}
                displayValue={"headerName"}
                onSelect={onChangeDropdown}
                onRemove={onRemoveDropdown}
                emptyRecordMsg={"No column available"}
                placeholder={"Search by column"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
                // selectionLimit="1"
                // loading={false}
                // loadingMessage={"Please Wait"}
              />
            </div>
          </div>

          <table className="table table-hover table-bordered">
            <Header
              tableHeaders={tableHeaders}
              onSorting={(apiField, order) => setSorting({ apiField, order })}
            />

            <tbody>
              {productsData.data.map((data) => {
                const {
                  _id,
                  name,
                  category,
                  subcategory,
                  brandName,
                  price,
                  discountPercentage,
                  unit,
                  stock,
                  offer,
                } = data;

                return (
                  <tr key={uniqueId.id()}>
                    <td className="align-middle">{name}</td>

                    <td className="align-middle">{category.name}</td>

                    <td className="align-middle">{subcategory.name}</td>

                    <td className="align-middle">{brandName}</td>

                    <td className="align-middle">{unit}</td>

                    <td className="align-middle">{price} Tk</td>

                    <td className="align-middle">
                      {offer && offer.hasOffer
                        ? discountPercentage + "%"
                        : "N/A"}
                    </td>

                    <td className="align-middle">{stock}</td>

                    <td className="align-middle">
                      <ul className="product-category-icon">
                        <li
                          className="d-inline-block p-2 btn read-icon"
                          onClick={() => {
                            sAdminProductChangeTab("Product Details");
                            sAdminProductIdSet(_id);
                            sAdminProductListSetScrollPosition(
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
                            sAdminProductChangeTab("Edit Product Details");
                            sAdminProductIdSet(_id);
                            sAdminProductListSetScrollPosition(
                              window.pageXOffset,
                              window.pageYOffset
                            );
                          }}
                        >
                          <BiEdit size={30} title="Edit details" />
                        </li>

                        {/* <li className="d-inline-block p-2">
                        <RiDeleteBin3Line size={30} title="Delete product" />
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
                totalProducts={totalProducts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>

        <p className="text-muted ml-3">
          {productsData.totalData ? (
            <>
              Showing {parseInt(productsData.startIndex) + 1} to
              {productsData.endIndex} from {productsData.totalData}
              entries
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
  const positionX = state.sAdminProductReducer.productListPositionX;
  const positionY = state.sAdminProductReducer.productListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductChangeTab: (tabName) =>
      dispatch(sAdminProductChangeTab(tabName)),
    sAdminProductIdSet: (id) => dispatch(sAdminProductIdSet(id)),
    sAdminProductListSetScrollPosition: (positionX, positionY) =>
      dispatch(sAdminProductListSetScrollPosition(positionX, positionY)),
  };
};

const connectedSAdminProductList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductList);

export { connectedSAdminProductList as SAdminProductList };
