import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductSliderImageChangeTab } from "../../redux";

import { sAdminProductSliderImageApi } from "../../api";

import { loaderUrl } from "../../constants";

import { getFormattedToken } from "../../helperFunctions";

class SAdminProductSliderImageAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      submitted: false,
      errorStatus: null,
      file: null,
      imagePreviewUrl: null,
    };
  }

  handleSubmit(e) {
    this.setState({ submitted: true });

    const { file } = this.state;
    const { formattedToken, sAdminProductSliderImageChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    fileData.append("image", file);

    if (file) {
      this.setState({ submitting: true, submitted: true });

      sAdminProductSliderImageApi
        .sAdminAddProductSliderImage(fileData, formattedToken)
        .then((response) => {
          this.setState({
            submitting: false,
            errorStatus: null,
            submitted: false,
          });

          sAdminProductSliderImageChangeTab("Slider Image List");
        })
        .catch((error) => {
          this.setState({
            submitting: false,
            errorStatus: error.response.status,
          });
          console.log(error);
        });
    }
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

  render() {
    const { submitted, errorStatus, submitting, imagePreviewUrl, file } =
      this.state;
    // console.log("check state", this.state);
    return (
      <>
        <p className="h1 m-4">Add Slider Image</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Slider Image Failed
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

          {submitted &&
            // errorStatus === 400 &&
            (file === null || file === undefined) && (
              <span className="validation-error m-2">
                Please select an image
              </span>
            )}

          {imagePreviewUrl && (
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="sliderListPreview">
                  <img
                    // className="rounded-circle"
                    src={imagePreviewUrl}
                    alt="product slider img..."
                  />
                </div>
              </div>
            </div>
          )}

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary create-button m-5">
              Submit
            </button>
          )}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const formattedToken = getFormattedToken(state.sAdminLoginReducer.token);

  return {
    formattedToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductSliderImageChangeTab: (tabName) =>
      dispatch(sAdminProductSliderImageChangeTab(tabName)),
  };
};

const connectedSAdminProductSliderImageAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSliderImageAdd);

export { connectedSAdminProductSliderImageAdd as SAdminProductSliderImageAdd };
