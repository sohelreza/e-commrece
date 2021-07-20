import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSubcategoryApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import {
  sAdminProductSubcategoryChangeTab,
  sAdminProductSubcategoryIdSet,
} from "../../redux";

import {
  checkFileExists,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductSubcategoryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subcategoryData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken, productSubcategoryId } = this.props;

    sAdminProductSubcategoryApi
      .sAdminGetProductSubcategoryDetails(productSubcategoryId, formattedToken)
      .then((response) => {
        this.setState({
          subcategoryData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  showData(subcategoryData) {
    const {
      sAdminProductSubcategoryChangeTab,
      sAdminProductSubcategoryIdSet,
    } = this.props;

    const {
      createdAt,
      image,
      name,
      updatedAt,
      _id,
      category,
    } = subcategoryData;

    const imageExists = checkFileExists(commonApi.api + image);

    const {
      day,
      date,
      month,
      year,
      hour,
      minute,
      second,
    } = getFormattedIsoDate(createdAt);

    const {
      day: dayUpdated,
      date: dateUpdated,
      month: monthUpdated,
      year: yearUpdated,
      hour: hourUpdated,
      minute: minuteUpdated,
      second: secondUpdated,
    } = getFormattedIsoDate(updatedAt);

    return (
      <>
        <p className="h1 m-4">Product Subcategory Details</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + image : no_image}
                alt="product subcategory img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Subcategory Name</th>

              <td>{name}</td>
            </tr>
            <tr>
              <th scope="row">Category Name</th>

              <td>{category.name}</td>
            </tr>

            <tr>
              <th scope="row">Created At</th>

              <td>
                {day +
                  ", " +
                  date +
                  " " +
                  month +
                  ", " +
                  year +
                  " (" +
                  hour +
                  ":" +
                  minute +
                  ":" +
                  second +
                  ")"}
              </td>
            </tr>

            <tr>
              <th scope="row">Last Updated At</th>

              <td>
                {dayUpdated +
                  ", " +
                  dateUpdated +
                  " " +
                  monthUpdated +
                  ", " +
                  yearUpdated +
                  " (" +
                  hourUpdated +
                  ":" +
                  minuteUpdated +
                  ":" +
                  secondUpdated +
                  ")"}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-primary update-button mt-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductSubcategoryChangeTab("Edit Subcategory Details");
            sAdminProductSubcategoryIdSet(_id);
          }}
        >
          Edit Subcategory Data Now
        </button>

        <button
          className="btn btn-primary back-button mt-2 mb-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductSubcategoryChangeTab("Subcategory List");
          }}
        >
          Back To Subcategory List
        </button>
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount, subcategoryData } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      subcategoryData && this.showData(subcategoryData)
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const productSubcategoryId =
    state.sAdminProductSubcategoryReducer.productSubcategoryId;

  return {
    formattedToken,
    productSubcategoryId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSubcategoryChangeTab: (tabName) =>
      dispatch(sAdminProductSubcategoryChangeTab(tabName)),
    sAdminProductSubcategoryIdSet: (id) =>
      dispatch(sAdminProductSubcategoryIdSet(id)),
  };
};

const connectedSAdminProductSubcategoryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSubcategoryDetails);

export { connectedSAdminProductSubcategoryDetails as SAdminProductSubcategoryDetails };
