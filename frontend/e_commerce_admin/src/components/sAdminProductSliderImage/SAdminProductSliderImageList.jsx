import React, { useEffect, useMemo, useState } from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import { BiDetail, BiEdit } from "react-icons/bi";
// import { RiDeleteBin3Line } from "react-icons/ri";

import Header from "./Header";
import Pagination from "./Pagination";
// import Searching from "./Searching";

import {
  checkFileExists,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

import UseFullPageLoader from "../../hooks/UseFullPageLoader";

import { itemsPerPageOptions } from "../../constants";

import { sAdminProductSliderImageApi } from "../../api";

import {
  sAdminProductSliderImageChangeTab,
  sAdminProductSliderImageIdSet,
  sAdminProductSliderImageListSetScrollPosition,
} from "../../redux";

import "./sAdminProductSliderImage.css";
import commonApi from "../../api/commonApi";
import no_image from "../../assets/image/no_image.jpg";

const SAdminProductSliderImageList = (props) => {
  // different properties for individual column in the category table
  const tableHeaders = [
    {
      headerName: "Slider Image",
      apiField: "",
      sortable: false,
      searchable: false,
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

  const [allSliderImages, setAllSliderImages] = useState([]); // all data from the api
  const [totalSliderImages, setTotalSliderImages] = useState(0); // number of data after computation
  const [currentPage, setCurrentPage] = useState(1); // current page no
  // const [search, setSearch] = useState(""); // search field text
  const [sorting, setSorting] = useState({ apiField: "", order: "" }); //sorting field name in the api and order of sorting
  const [itemsPerPage, setItemsPerPage] = useState(10); // number of data in the page
  // const [searchableField] = useState(searchableFieldName); // field name in the api where search can be applied
  // const [dropdownField] = useState(searchableFieldObject); // searchable field name for the advanced search in the dropdown
  const [loader, showLoader, hideLoader] = UseFullPageLoader();

  useEffect(() => {
    const getAllSliderImages = () => {
      const { formattedToken, positionX, positionY } = props;
      showLoader();

      sAdminProductSliderImageApi
        .sAdminGetProductSliderImageList(formattedToken)
        .then((response) => {
          hideLoader();
          setAllSliderImages(response.data);
          window.scrollTo(positionX, positionY);
        });
    };

    getAllSliderImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliderImagesData = useMemo(() => {
    let computedSliderImages = allSliderImages;

    setTotalSliderImages(computedSliderImages.length);

    // sorting categories list
    if (sorting.apiField) {
      const reversed = sorting.order === "asc" ? 1 : -1;

      computedSliderImages = computedSliderImages.sort((a, b) => {
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

    const data = computedSliderImages.slice(startIndex, endIndex);

    const computedData = {
      data,
      startIndex,
      endIndex: parseInt(endIndex) - parseInt(itemsPerPage) + data.length,
      totalData: computedSliderImages.length,
    };

    return computedData;
  }, [allSliderImages, currentPage, sorting, itemsPerPage]);

  const {
    sAdminProductSliderImageChangeTab,
    sAdminProductSliderImageListSetScrollPosition,
    sAdminProductSliderImageIdSet,
  } = props;

  // console.log("check all data", allSliderImages);

  return (
    <>
      <p className="h1 m-4">Slider Image List</p>

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
          </div>

          <table className="table table-hover table-bordered">
            <Header
              tableHeaders={tableHeaders}
              onSorting={(apiField, order) => setSorting({ apiField, order })}
            />

            <tbody>
              {sliderImagesData.data.map((data) => {
                const { _id, image } = data;
                const imageExists = checkFileExists(commonApi.api + image);

                return (
                  <tr key={uniqueId.id()}>
                    <td className="align-middle">
                      <div className="container mb-2">
                        <div className="row d-flex justify-content-center align-items-center">
                          <div className="sliderListPreview">
                            <img
                              // className="rounded-circle"
                              src={
                                imageExists ? commonApi.api + image : no_image
                              }
                              alt="slider img..."
                            />
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="align-middle">
                      <ul className="product-category-icon">
                        <li
                          className="d-inline-block p-2 btn read-icon"
                          onClick={() => {
                            sAdminProductSliderImageChangeTab(
                              "Slider Image Details"
                            );
                            sAdminProductSliderImageIdSet(_id);
                            sAdminProductSliderImageListSetScrollPosition(
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
                            sAdminProductSliderImageChangeTab(
                              "Edit Slider Image Details"
                            );
                            sAdminProductSliderImageIdSet(_id);
                            sAdminProductSliderImageListSetScrollPosition(
                              window.pageXOffset,
                              window.pageYOffset
                            );
                          }}
                        >
                          <BiEdit size={30} title="Edit details" />
                        </li>

                        {/* <li className="d-inline-block p-2">
                        <RiDeleteBin3Line size={30} title="Delete category" />
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
                totalSliderImages={totalSliderImages}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>

        <p className="text-muted ml-3">
          {sliderImagesData.totalData ? (
            <>
              Showing {parseInt(sliderImagesData.startIndex) + 1} to{" "}
              {sliderImagesData.endIndex} from {sliderImagesData.totalData}{" "}
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
  const positionX =
    state.sAdminProductSliderImageReducer.productSliderImageListPositionX;
  const positionY =
    state.sAdminProductSliderImageReducer.productSliderImageListPositionY;

  return {
    formattedToken,
    positionX,
    positionY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSliderImageChangeTab: (tabName) =>
      dispatch(sAdminProductSliderImageChangeTab(tabName)),
    sAdminProductSliderImageIdSet: (id) =>
      dispatch(sAdminProductSliderImageIdSet(id)),
    sAdminProductSliderImageListSetScrollPosition: (positionX, positionY) =>
      dispatch(
        sAdminProductSliderImageListSetScrollPosition(positionX, positionY)
      ),
  };
};

const connectedSAdminProductSliderImageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSliderImageList);

export { connectedSAdminProductSliderImageList as SAdminProductSliderImageList };
