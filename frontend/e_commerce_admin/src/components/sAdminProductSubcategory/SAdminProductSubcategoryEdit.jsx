import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import {
  sAdminProductCategoryApi,
  sAdminProductSubcategoryApi,
} from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "../../constants";

import {
  sAdminProductSubcategoryChangeTab,
  sAdminProductSubcategoryIdSet,
} from "../../redux";

import {
  checkFileExists,
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductSubcategoryEdit extends Component {
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
      categoryOptions: [],
      fetchingCategoryData: false,
      fetchedCategoryData: false,
      category: null,
    };
  }

  componentDidMount() {
    const { formattedToken, productSubcategoryId } = this.props;
    this.setState({ fetchingCategoryData: true, fetchedCategoryData: false });

    sAdminProductSubcategoryApi
      .sAdminGetProductSubcategoryDetails(productSubcategoryId, formattedToken)
      .then((response) => {
        this.setState({
          category: response.data.category._id,
          name: response.data.name,
          image: response.data.image,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });

    sAdminProductCategoryApi
      .sAdminGetProductCategoryList(formattedToken)
      .then((response) => {
        this.setState({
          categoryOptions: response.data,
          fetchingCategoryData: false,
          fetchedCategoryData: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          fetchingCategoryData: false,
          fetchedCategoryData: true,
        });
      });
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { _id, name, file, category } = this.state;

    const { formattedToken, sAdminProductSubcategoryChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    file && fileData.append("image", file);
    fileData.append("name", name);
    fileData.append("category", category);

    sAdminProductSubcategoryApi
      .sAdminUpdateProductSubcategoryDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductSubcategoryChangeTab("Subcategory Details");
        sAdminProductSubcategoryIdSet(_id);
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
      data = formValidation.checkType(state, "subcategoryName", value);
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

  onChangeDropdown = (dropdownField) => {
    this.setState({ category: dropdownField[0]._id });
  };

  onRemoveDropdown = () => {
    this.setState({ category: null });
  };

  showData() {
    const { sAdminProductSubcategoryChangeTab } = this.props;

    const {
      name,
      image,
      submitting,
      submitted,
      nameError,
      errorStatus,
      imagePreviewUrl,
      categoryOptions,
      fetchingCategoryData,
      category,
    } = this.state;

    const imageExists = checkFileExists(commonApi.api + image);

    let selectedCategory = categoryOptions.filter((obj) => {
      return obj._id === category;
    });

    // console.log("check selected category", selectedCategory);

    return (
      <>
        <p className="h1 m-4">Product Subcategory Edit</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating Product Subcategory Failed
          </span>
        )}

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

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category Name
            </label>

            <div className="col-sm-10">
              <Multiselect
                options={categoryOptions}
                selectedValues={selectedCategory}
                displayValue={"name"}
                onSelect={this.onChangeDropdown}
                onRemove={this.onRemoveDropdown}
                emptyRecordMsg={"No Category available"}
                placeholder={"Select or search category"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
                selectionLimit="1"
                loading={fetchingCategoryData}
                loadingMessage={"Please Wait..."}
              />

              {submitted && !category && (
                <span className="validation-error">
                  Please select a valid category
                </span>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Subcategory Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Product Subcategory Name..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid subcategory name
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
              Subcategory Image
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
                    alt="product subcategory img..."
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
              sAdminProductSubcategoryChangeTab("Subcategory List");
            }}
          >
            Back To Subcategory List
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

const connectedSAdminProductSubcategoryEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSubcategoryEdit);

export { connectedSAdminProductSubcategoryEdit as SAdminProductSubcategoryEdit };
