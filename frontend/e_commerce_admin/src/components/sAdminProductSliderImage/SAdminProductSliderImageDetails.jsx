import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSliderImageApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import {
  sAdminProductSliderImageChangeTab,
  sAdminProductSliderImageIdSet,
} from "../../redux";

import {
  checkFileExists,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductSliderImageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderImageData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken, productSliderImageId } = this.props;

    sAdminProductSliderImageApi
      .sAdminGetProductSliderImageDetails(productSliderImageId, formattedToken)
      .then((response) => {
        this.setState({
          sliderImageData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  showData(sliderImageData) {
    const { sAdminProductSliderImageChangeTab, sAdminProductSliderImageIdSet } =
      this.props;

    const { createdAt, image, updatedAt, _id } = sliderImageData;
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
        <p className="h1 m-4">Slider Image Details</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="sliderListPreview">
              <img
                src={imageExists ? commonApi.api + image : no_image}
                alt="slider img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
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
            sAdminProductSliderImageChangeTab("Edit Slider Image Details");
            sAdminProductSliderImageIdSet(_id);
          }}
        >
          Edit Slider Image Data Now
        </button>

        <button
          className="btn btn-primary back-button mt-2 mb-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductSliderImageChangeTab("Slider Image List");
          }}
        >
          Back To Slider Image List
        </button>
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount, sliderImageData } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      sliderImageData && this.showData(sliderImageData)
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);
  const productSliderImageId =
    state.sAdminProductSliderImageReducer.productSliderImageId;

  return {
    formattedToken,
    productSliderImageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSliderImageChangeTab: (tabName) =>
      dispatch(sAdminProductSliderImageChangeTab(tabName)),
    sAdminProductSliderImageIdSet: (id) =>
      dispatch(sAdminProductSliderImageIdSet(id)),
  };
};

const connectedSAdminProductSliderImageDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSliderImageDetails);

export { connectedSAdminProductSliderImageDetails as SAdminProductSliderImageDetails };
