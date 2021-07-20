import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";

import {
  sAdminProductCategoryApi,
  sAdminProductApi,
  sAdminProductBrandApi,
} from "../../api";
import commonApi from "../../api/commonApi";

import FullPageLoader from "../../hooks/Loader";

import { loaderUrl } from "../../constants";

import { sAdminProductChangeTab, sAdminProductIdSet } from "../../redux";

import {
  checkFileExists,
  formValidation,
  getFormattedToken,
  uniqueId,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
      name: "",
      nameError: [],
      submitting: false,
      submitted: false,
      errorStatus: null,
      file: null,
      imagePreviewUrl: null,
      category: null,
      categoryOptions: [],
      fetchingCategoryData: false,
      fetchedCategoryData: false,
      description: "",
      descriptionError: [],
      overview: "",
      overviewError: [],
      subcategory: null,
      subcategoryOptions: [],
      fetchingSubcategoryData: false,
      fetchedSubcategoryData: false,
      brand: "",
      brandOptions: [],
      fetchingBrandData: false,
      fetchedBrandData: false,
      unit: "",
      unitError: [],
      price: "",
      priceError: [],
      stock: "",
      stockError: [],
      hasOffer: false,
      discountPercentage: "",
      discountPercentageError: [],
      discountPrice: "",
      discountPriceError: [],
      multipleImage: [],
      thumbnailImage: null,
    };
  }

  componentDidMount() {
    const { formattedToken, productId } = this.props;

    this.setState({
      fetchingCategoryData: true,
      fetchedCategoryData: false,
      fetchingSubcategoryData: true,
      fetchedSubcategoryData: false,
      fetchingBrandData: true,
      fetchedBrandData: false,
    });

    sAdminProductApi
      .sAdminGetProductDetails(productId, formattedToken)
      .then((response) => {
        this.setState({
          category: response.data.category._id,
          brand:
            response.data.brand && response.data.brand._id
              ? response.data.brand._id
              : "",
          description: response.data.description,
          multipleImage: response.data.multipleImage,
          hasOffer:
            response.data.offer && response.data.offer.hasOffer
              ? response.data.offer.hasOffer
              : false,
          discountPercentage:
            response.data.offer && response.data.offer.discountPercentage
              ? response.data.offer.discountPercentage
              : 0,
          discountPrice:
            response.data.offer && response.data.offer.discountPrice
              ? response.data.offer.discountPrice
              : 0,
          overview: response.data.overview,
          price: response.data.price,
          stock: response.data.stock,
          subcategory: response.data.subcategory._id,
          thumbnailImage: response.data.thumbnailImage,
          unit: response.data.unit,
          name: response.data.name,
          _id: response.data._id,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });

        sAdminProductApi
          .sAdminGetSpecificSubcategories(
            response.data.category._id,
            formattedToken
          )
          .then((response2) => {
            this.setState({
              fetchingSubcategoryData: false,
              fetchedSubcategoryData: true,
              subcategoryOptions: response2.data,
            });
          })
          .catch((error2) => {
            this.setState({
              fetchingSubcategoryData: false,
              fetchedSubcategoryData: true,
            });
            console.log(error2);
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

    sAdminProductBrandApi
      .sAdminGetProductBrandList(formattedToken)
      .then((response) => {
        this.setState({
          brandOptions: response.data,
          fetchingBrandData: false,
          fetchedBrandData: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          fetchingBrandData: false,
          fetchedBrandData: true,
        });
      });
  }

  handleSubmit(e) {
    this.setState({ submitting: true, submitted: true });

    const {
      _id,
      name,
      file,
      category,
      description,
      overview,
      subcategory,
      brand,
      unit,
      price,
      stock,
      hasOffer,
      discountPercentage,
      discountPrice,
    } = this.state;

    const { formattedToken, sAdminProductChangeTab } = this.props;

    e.preventDefault();

    const fileData = new FormData();
    file && fileData.append("thumbnailImage", file);
    fileData.append("name", name);
    fileData.append("category", category);
    fileData.append("description", description);
    fileData.append("overview", overview);
    fileData.append("subcategory", subcategory);
    fileData.append("brand", brand);
    fileData.append("unit", unit);
    fileData.append("price", price);
    fileData.append("stock", stock);
    fileData.append("hasOffer", hasOffer);
    fileData.append("discountPercentage", hasOffer ? discountPercentage : 0);
    fileData.append("discountPrice", hasOffer ? discountPrice : 0);

    sAdminProductApi
      .sAdminUpdateProductDetails(_id, fileData, formattedToken)
      .then((response) => {
        this.setState({
          submitting: false,
          errorStatus: null,
          submitted: false,
        });

        sAdminProductChangeTab("Product Details");
        sAdminProductIdSet(_id);
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
    // discountPrice
    if (name === "name") {
      data = formValidation.checkType(state, "productName", value);
    } else if (name === "description") {
      data = formValidation.checkType(state, "productDescription", value);
    } else if (name === "overview") {
      data = formValidation.checkType(state, "productOverview", value);
    } else if (name === "unit") {
      data = formValidation.checkType(state, "productUnit", value);
    } else if (name === "price") {
      data = formValidation.checkType(state, "productPrice", value);
    } else if (name === "stock") {
      data = formValidation.checkType(state, "productStock", value);
    } else if (name === "discountPercentage") {
      data = formValidation.checkType(
        state,
        "productDiscountPercentage",
        value
      );
    } else if (name === "discountPrice") {
      data = formValidation.checkType(state, "productDiscountPrice", value);
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

  onChangeCategory = (dropdownField) => {
    const { formattedToken } = this.props;

    this.setState({
      fetchingSubcategoryData: true,
      fetchedSubcategoryData: false,
    });

    sAdminProductApi
      .sAdminGetSpecificSubcategories(dropdownField[0]._id, formattedToken)
      .then((response) => {
        this.setState({
          fetchingSubcategoryData: false,
          errorStatus: null,
          fetchedSubcategoryData: true,
          subcategoryOptions: response.data,
          category: dropdownField[0]._id,
        });
      })
      .catch((error) => {
        this.setState({
          fetchingSubcategoryData: false,
          fetchedSubcategoryData: true,
          errorStatus: error.response.status,
          category: dropdownField[0]._id,
        });
        console.log(error);
      });
  };

  onRemoveCategory = () => {
    this.setState({
      category: null,
      subcategory: null,
      subcategoryOptions: [],
    });
  };

  onChangeSubcategory = (dropdownField) => {
    this.setState({
      errorStatus: null,
      subcategory: dropdownField[0]._id,
    });
  };

  onRemoveSubcategory = () => {
    this.setState({
      subcategory: null,
    });
  };

  onChangeBrand = (dropdownField) => {
    this.setState({
      errorStatus: null,
      brand: dropdownField[0]._id,
    });
  };

  onRemoveBrand = () => {
    this.setState({
      brand: "",
    });
  };

  handleCheckbox(e) {
    this.setState({ hasOffer: e.target.checked });
  }

  showData() {
    const {
      name,
      submitted,
      errorStatus,
      nameError,
      submitting,
      imagePreviewUrl,
      category,
      categoryOptions,
      fetchingCategoryData,
      description,
      descriptionError,
      overview,
      overviewError,
      subcategoryOptions,
      fetchingSubcategoryData,
      subcategory,
      brand,
      brandOptions,
      fetchingBrandData,
      unit,
      unitError,
      price,
      priceError,
      stock,
      stockError,
      hasOffer,
      discountPercentage,
      discountPercentageError,
      discountPrice,
      discountPriceError,
      thumbnailImage,
    } = this.state;

    // console.log("check state", this.state);

    const { sAdminProductChangeTab } = this.props;

    let selectedCategory = categoryOptions.filter((obj) => {
      return obj._id === category;
    });

    let selectedSubcategory = subcategoryOptions.filter((obj) => {
      return obj._id === subcategory;
    });

    let selectedBrand = brandOptions.filter((obj) => {
      return obj._id === brand;
    });

    let calculatedPrice =
      price && (discountPercentage || discountPercentage === 0)
        ? (
            parseFloat(price) -
            (parseFloat(price) * parseFloat(discountPercentage)) / 100
          ).toFixed(2) + " taka"
        : "unavailable";

    const imageExists = checkFileExists(commonApi.api + thumbnailImage);

    // console.log("check selected category", selectedCategory);

    return (
      <>
        <p className="h1 m-4">Product Edit</p>

        {submitted && errorStatus === 400 && (
          <span className="validation-error mt-2">
            Updating Product Details Failed
          </span>
        )}

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + thumbnailImage : no_image}
                alt="product subcategory img..."
              />
            </div>
          </div>
        </div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Product Name
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Product Name..."
                value={name}
                onChange={this.handleChange.bind(this)}
              />

              {submitted &&
                (!name ? (
                  <span className="validation-error">
                    Please give a valid product name
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
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category Name
            </label>

            <div className="col-sm-10">
              <Multiselect
                options={categoryOptions}
                selectedValues={selectedCategory}
                displayValue={"name"}
                onSelect={this.onChangeCategory}
                onRemove={this.onRemoveCategory}
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
            <label htmlFor="subcategory" className="col-sm-2 col-form-label">
              Subcategory Name
            </label>

            <div className="col-sm-10">
              <Multiselect
                selectedValues={selectedSubcategory}
                options={subcategoryOptions}
                displayValue={"name"}
                onSelect={this.onChangeSubcategory}
                onRemove={this.onRemoveSubcategory}
                emptyRecordMsg={"No Subcategory available"}
                placeholder={"Select or search subcategory"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
                selectionLimit="1"
                loading={fetchingSubcategoryData}
                loadingMessage={"Please Wait..."}
              />

              {submitted && !subcategory && (
                <span className="validation-error">
                  Please select a valid subcategory
                </span>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="brand" className="col-sm-2 col-form-label">
              Brand Name
            </label>

            <div className="col-sm-10">
              <Multiselect
                selectedValues={selectedBrand}
                options={brandOptions}
                displayValue={"name"}
                onSelect={this.onChangeBrand}
                onRemove={this.onRemoveBrand}
                emptyRecordMsg={"No Brand available"}
                placeholder={"Select or search brand"}
                avoidHighlightFirstOption={true}
                closeIcon={"cancel"}
                selectionLimit="1"
                loading={fetchingBrandData}
                loadingMessage={"Please Wait..."}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="unit" className="col-sm-2 col-form-label">
              Unit
            </label>

            <div className="col-sm-6">
              <div className="form-row">
                <div className="col">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="unit"
                      name="unit"
                      placeholder="Product unit for measurement e.g. kg, gm, litre, piece etc ..."
                      value={unit}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                </div>
              </div>

              {submitted &&
                (!unit ? (
                  <span className="validation-error">
                    Please give a valid product unit
                  </span>
                ) : (
                  unitError.map((message) => {
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
            <label htmlFor="price" className="col-sm-2 col-form-label">
              Price
            </label>

            <div className="col-sm-6">
              <div className="form-row">
                <div className="col">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Product price..."
                      value={price}
                      onChange={this.handleChange.bind(this)}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">Taka / Unit</span>
                    </div>
                  </div>
                </div>
              </div>

              {submitted &&
                (!price ? (
                  <span className="validation-error">
                    Please give a valid product price
                  </span>
                ) : (
                  priceError.map((message) => {
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
            <label htmlFor="stock" className="col-sm-2 col-form-label">
              In Stock
            </label>

            <div className="col-sm-6">
              <div className="form-row">
                <div className="col">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="stock"
                      name="stock"
                      placeholder="Product stock..."
                      value={stock}
                      onChange={this.handleChange.bind(this)}
                    />

                    <div className="input-group-append">
                      <span className="input-group-text">Unit</span>
                    </div>
                  </div>
                </div>
              </div>

              {submitted &&
                (!stock ? (
                  <span className="validation-error">
                    Please give a valid product stock
                  </span>
                ) : (
                  stockError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
            </div>
          </div>

          <div className="custom-control custom-checkbox my-4 sm-2 d-flex">
            <input
              type="checkbox"
              className="custom-control-input"
              id="hasOffer"
              checked={hasOffer ? "checked" : ""}
              onChange={this.handleCheckbox.bind(this)}
            />

            <label className="custom-control-label" htmlFor="hasOffer">
              Include offer
            </label>
          </div>

          {hasOffer && (
            <>
              <div className="form-group row">
                <label
                  htmlFor="discountPercentage"
                  className="col-sm-2 col-form-label float-right"
                >
                  Discount
                </label>

                <div className="col-sm-6">
                  <div className="form-row">
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="discountPercentage"
                          name="discountPercentage"
                          placeholder="Product discount in percentage..."
                          value={discountPercentage}
                          onChange={this.handleChange.bind(this)}
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitted &&
                    (!discountPercentage ? (
                      <span className="validation-error">
                        Please give a valid product discount
                      </span>
                    ) : (
                      discountPercentageError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })
                    ))}
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="discountPrice"
                  className="col-sm-2 col-form-label"
                >
                  Price After Discount
                </label>

                <div className="col-sm-6">
                  <div className="form-row">
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="discountPrice"
                          name="discountPrice"
                          placeholder="Final price of product after discount..."
                          value={discountPrice}
                          onChange={this.handleChange.bind(this)}
                        />

                        <div className="input-group-append">
                          <span className="input-group-text">Taka / Unit</span>
                        </div>
                      </div>

                      <small className="form-text text-muted">
                        Calculated price after discount is {calculatedPrice}
                      </small>
                    </div>
                  </div>

                  {submitted &&
                    (!discountPrice ? (
                      <span className="validation-error">
                        Please give a valid product price
                      </span>
                    ) : (
                      discountPriceError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })
                    ))}
                </div>
              </div>
            </>
          )}

          <div className="form-group row">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              Product Image
            </label>

            <div className="col-sm-10 text-left">
              <input
                className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
              />
            </div>
          </div>

          {/* {submitted && (file === null || file === undefined) && (
            <span className="validation-error mt-2">
              Please select an image
            </span>
          )} */}

          {imagePreviewUrl && (
            <div className="container mb-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="rounded-circle imgPreview">
                  <img
                    className="rounded-circle"
                    src={imagePreviewUrl}
                    alt="product img..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Product Description
            </label>

            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Write something about the product as a description..."
                value={description}
                onChange={this.handleChange.bind(this)}
                rows="4"
              />

              {submitted &&
                (!description ? (
                  <span className="validation-error">
                    Please give a valid product description
                  </span>
                ) : (
                  descriptionError.map((message) => {
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
            <label htmlFor="overview" className="col-sm-2 col-form-label">
              Product Overview
            </label>

            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                id="overview"
                name="overview"
                placeholder="Write overview of the product..."
                value={overview}
                onChange={this.handleChange.bind(this)}
                rows="4"
              />

              {submitted &&
                (!overview ? (
                  <span className="validation-error">
                    Please give a valid product overview
                  </span>
                ) : (
                  overviewError.map((message) => {
                    return (
                      <span key={uniqueId.id()} className="validation-error">
                        {message}
                      </span>
                    );
                  })
                ))}
            </div>
          </div>

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
            className="btn btn-primary back-button mt-2 mb-5 btn-block"
            type="button"
            onClick={() => {
              sAdminProductChangeTab("Product List");
            }}
          >
            Back To Product List
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
  const productId = state.sAdminProductReducer.productId;

  return {
    formattedToken,
    productId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminProductChangeTab: (tabName) =>
      dispatch(sAdminProductChangeTab(tabName)),
    sAdminProductIdSet: (id) => dispatch(sAdminProductIdSet(id)),
  };
};

const connectedSAdminProductEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductEdit);

export { connectedSAdminProductEdit as SAdminProductEdit };
