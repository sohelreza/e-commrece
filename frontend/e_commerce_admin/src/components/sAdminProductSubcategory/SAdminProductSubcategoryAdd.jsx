import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import { sAdminProductSubcategoryChangeTab } from "../../redux";

import { loaderUrl } from "../../constants";

import {
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

import {
  sAdminProductCategoryApi,
  sAdminProductSubcategoryApi,
} from "../../api";

class SAdminProductSubcategoryAdd extends Component {
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
      categoryOptions: [],
      fetchingCategoryData: false,
      fetchedCategoryData: false,
      category: null,
    };
  }

  componentDidMount() {
    const { formattedToken } = this.props;
    this.setState({ fetchingCategoryData: true, fetchedCategoryData: false });

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

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const { name, file, category } = this.state;
    const { formattedToken, sAdminProductSubcategoryChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    fileData.append("image", file);
    fileData.append("name", name);
    fileData.append("category", category);

    sAdminProductSubcategoryApi
      .sAdminAddProductSubcategory(fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductSubcategoryChangeTab("Subcategory List");
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

  onChangeDropdown = (dropdownField) => {
    this.setState({ category: dropdownField[0]._id });
  };

  onRemoveDropdown = () => {
    this.setState({ category: null });
  };

  render() {
    const {
      name,
      submitted,
      errorStatus,
      nameError,
      submitting,
      imagePreviewUrl,
      file,
      category,
      categoryOptions,
      fetchingCategoryData,
    } = this.state;

    // console.log("check state", this.state);

    return (
      <>
        <p className="h1 m-4">Add Product Subcategory</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Adding Product Subcategory Failed
          </span>
        )}

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category Name
            </label>

            <div className="col-sm-10">
              <Multiselect
                options={categoryOptions}
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
                    alt="product subcategory img..."
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
    sAdminProductSubcategoryChangeTab: (tabName) =>
      dispatch(sAdminProductSubcategoryChangeTab(tabName)),
  };
};

const connectedSAdminProductSubcategoryAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductSubcategoryAdd);

export { connectedSAdminProductSubcategoryAdd as SAdminProductSubcategoryAdd };
