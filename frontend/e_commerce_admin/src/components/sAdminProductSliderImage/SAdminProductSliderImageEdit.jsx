import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSliderImageApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "../../constants";

import {
  sAdminProductSliderImageChangeTab,
  sAdminProductSliderImageIdSet,
} from "../../redux";

import { checkFileExists, getFormattedToken } from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductSliderImageEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      image: null,
      submitting: false,
      submitted: false,
      errorStatus: null,
      file: null,
      imagePreviewUrl: null,
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
          image: response.data.image,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { _id, file } = this.state;

    const { formattedToken, sAdminProductSliderImageChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    // file && fileData.append("image", file);
    fileData.append("image", file ? file : undefined);

    sAdminProductSliderImageApi
      .sAdminUpdateProductSliderImageDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductSliderImageChangeTab("Slider Image Details");
        sAdminProductSliderImageIdSet(_id);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
  }

  handleImageChange(e) {
    this.setState({
      file: null,
      imagePreviewUrl: null,
    });

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  showData() {
    const { sAdminProductSliderImageChangeTab } = this.props;

    const { image, submitting, submitted, errorStatus, imagePreviewUrl } =
      this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    return (
      <>
        <p className="h1 m-4">Slider Image Edit</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating Slider Image Failed
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              New Slider Image
            </label>

            <div className="col-sm-10 text-left">
              <input
                className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
              />
            </div>
          </div>

          {!imagePreviewUrl && (
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
          )}

          {imagePreviewUrl && (
            <div className="container mb-2">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="sliderListPreview">
                  <img src={imagePreviewUrl} alt="slider img..." />
                </div>
              </div>
            </div>
          )}

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button
              type="submit"
              className="btn btn-primary update-button mt-2 btn-block"
            >
              Submit Updated Data
            </button>
          )}
        </form>

        {!submitting && (
          <button
            className="btn btn-primary back-button mt-2 btn-block"
            type="button"
            onClick={() => {
              sAdminProductSliderImageChangeTab("Slider Image List");
            }}
          >
            Back To Slider Image List
          </button>
        )}
      </>
    );
  }

  render() {
    const { apiLoadedCount, totalApiCount } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      this.showData()
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

const connectedSAdminProductSliderImageEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSliderImageEdit);

export { connectedSAdminProductSliderImageEdit as SAdminProductSliderImageEdit };
