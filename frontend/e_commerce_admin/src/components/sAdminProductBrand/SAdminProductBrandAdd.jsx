import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductBrandChangeTab } from "../../redux";

import { sAdminProductBrandApi } from "../../api";

import { loaderUrl } from "../../constants";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

class SAdminProductBrandAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      submitting: false,
      submitted: false,
      nameError: [],
      errorStatus: null,
      file: null,
      imagePreviewUrl: null,
    };
  }

  handleChange(e) {
    const { state } = this;
    const { name, value } = e.target;
    let data = {};

    if (name === "name") {
      data = formValidation.checkType(state, "brandName", value);
    } else {
      data = state;
    }

    this.setState(data);
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { name, file } = this.state;
    const { formattedToken, sAdminProductBrandChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    fileData.append("image", file);
    fileData.append("name", name);

    sAdminProductBrandApi
      .sAdminAddProductBrand(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductBrandChangeTab("Brand List");
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

  render() {
    const {
      name,
      submitted,
      errorStatus,
      nameError,
      submitting,
      imagePreviewUrl,
      file,
    } = this.state;

    // console.log("check state", this.state);

    return (
      <>
        <p className="h1 m-4">Add Product Brand</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Product Brand Failed
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Brand Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Product Brand Name..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid brand name
                  </span>
                ) : (
                  nameError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              Brand Image
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
            errorStatus === 400 &&
            (file === null || file === undefined) && (
              <span className="validation-error mt-2">
                Please select an image
              </span>
            )}

          {imagePreviewUrl && (
            <div className="container mb-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="rounded-circle imgPreview">
                  <img
                    className="rounded-circle"
                    src={imagePreviewUrl}
                    alt="product brand img..."
                  />
                </div>
              </div>
            </div>
          )}

          {submitting ? (
            <img src={loaderUrl} alt="Please Wait..." />
          ) : (
            <button type="submit" className="btn btn-primary create-button">
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
    sAdminProductBrandChangeTab: (tabName) =>
      dispatch(sAdminProductBrandChangeTab(tabName)),
  };
};

const connectedSAdminProductBrandAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductBrandAdd);

export { connectedSAdminProductBrandAdd as SAdminProductBrandAdd };
