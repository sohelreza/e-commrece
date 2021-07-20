import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductBrandApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import {
  sAdminProductBrandChangeTab,
  sAdminProductBrandIdSet,
} from "../../redux";

import {
  checkFileExists,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductBrandDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brandData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken, productBrandId } = this.props;

    sAdminProductBrandApi
      .sAdminGetProductBrandDetails(productBrandId, formattedToken)
      .then((response) => {
        this.setState({
          brandData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  showData(brandData) {
    const { sAdminProductBrandChangeTab, sAdminProductBrandIdSet } = this.props;

    const { createdAt, image, name, updatedAt, _id } = brandData;
    const imageExists = checkFileExists(commonApi.api + image);

    const { day, date, month, year, hour, minute, second } =
      getFormattedIsoDate(createdAt);

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
        <p className="h1 m-4">Product Brand Details</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + image : no_image}
                alt="product brand img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
            <tr>
              <th scope="row">Brand Name</th>

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
            sAdminProductBrandChangeTab("Edit Brand Details");
            sAdminProductBrandIdSet(_id);
          }}
        >
          Edit Brand Data Now
        </button>

        <button
          className="btn btn-primary back-button mt-2 mb-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductBrandChangeTab("Brand List");
          }}
        >
          Back To Brand List
        </button>
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount, brandData } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      brandData && this.showData(brandData)
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const productBrandId = state.sAdminProductBrandReducer.productBrandId;

  return {
    formattedToken,
    productBrandId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductBrandChangeTab: (tabName) =>
      dispatch(sAdminProductBrandChangeTab(tabName)),
    sAdminProductBrandIdSet: (id) => dispatch(sAdminProductBrandIdSet(id)),
  };
};

const connectedSAdminProductBrandDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductBrandDetails);

export { connectedSAdminProductBrandDetails as SAdminProductBrandDetails };
