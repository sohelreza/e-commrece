import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductBrandApi } from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "../../constants";

import {
  sAdminProductBrandChangeTab,
  sAdminProductBrandIdSet,
} from "../../redux";

import {
  checkFileExists,
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductBrandEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      name: "",
      image: null,
      submitting: false,
      submitted: false,
      nameError: [],
      errorStatus: null,
      file: null,
      imagePreviewUrl: null,
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
          name: response.data.name,
          image: response.data.image,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { _id, name, file } = this.state;

    const { formattedToken, sAdminProductBrandChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    file && fileData.append("image", file);
    fileData.append("name", name);

    sAdminProductBrandApi
      .sAdminUpdateProductBrandDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductBrandChangeTab("Brand Details");
        sAdminProductBrandIdSet(_id);
      })
      .catch((error) => {
        this.setState({
          submitting: false,
          errorStatus: error.response.status,
        });

        console.log(error);
      });
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
    const { sAdminProductBrandChangeTab } = this.props;

    const {
      name,
      image,
      submitting,
      submitted,
      nameError,
      errorStatus,
      imagePreviewUrl,
    } = this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    return (
      <>
        <p className="h1 m-4">Product Brand Edit</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating Product Brand Failed
          </span>
        )}

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
              sAdminProductBrandChangeTab("Brand List");
            }}
          >
            Back To Brand List
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

const connectedSAdminProductBrandEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductBrandEdit);

export { connectedSAdminProductBrandEdit as SAdminProductBrandEdit };
