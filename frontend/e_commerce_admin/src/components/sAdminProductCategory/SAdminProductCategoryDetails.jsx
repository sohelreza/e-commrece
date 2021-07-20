import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductCategoryApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import {
  sAdminProductCategoryChangeTab,
  sAdminProductCategoryIdSet,
} from "../../redux";

import {
  checkFileExists,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductCategoryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken, productCategoryId } = this.props;

    sAdminProductCategoryApi
      .sAdminGetProductCategoryDetails(productCategoryId, formattedToken)
      .then((response) => {
        this.setState({
          categoryData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  showData(categoryData) {
    const {
      sAdminProductCategoryChangeTab,
      sAdminProductCategoryIdSet,
    } = this.props;

    const { createdAt, image, name, updatedAt, _id } = categoryData;
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
        <p className="h1 m-4">Product Categories Details</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + image : no_image}
                alt="product category img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Category Name</th>

              <td>{name}</td>
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
            sAdminProductCategoryChangeTab("Edit Category Details");
            sAdminProductCategoryIdSet(_id);
          }}
        >
          Edit Category Data Now
        </button>

        <button
          className="btn btn-primary back-button mt-2 mb-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductCategoryChangeTab("Category List");
          }}
        >
          Back To Category List
        </button>
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount, categoryData } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      categoryData && this.showData(categoryData)
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const productCategoryId =
    state.sAdminProductCategoryReducer.productCategoryId;

  return {
    formattedToken,
    productCategoryId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductCategoryChangeTab: (tabName) =>
      dispatch(sAdminProductCategoryChangeTab(tabName)),
    sAdminProductCategoryIdSet: (id) =>
      dispatch(sAdminProductCategoryIdSet(id)),
  };
};

const connectedSAdminProductCategoryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductCategoryDetails);

export { connectedSAdminProductCategoryDetails as SAdminProductCategoryDetails };
