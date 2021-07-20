import React, { Component } from "react";
import { connect } from "react-redux";

import { sAdminProductChangeTab, sAdminProductIdSet } from "../../redux";

import FullPageLoader from "../../hooks/Loader";

import { sAdminProductApi } from "../../api";
import commonApi from "../../api/commonApi";

import {
  checkFileExists,
  getFormattedIsoDate,
  getFormattedToken,
} from "../../helperFunctions";

import no_image from "../../assets/image/no_image.jpg";

class SAdminProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: null,
      totalApiCount: 1,
      apiLoadedCount: 0,
    };
  }

  componentDidMount() {
    const { formattedToken, productId } = this.props;

    sAdminProductApi
      .sAdminGetProductDetails(productId, formattedToken)
      .then((response) => {
        this.setState({
          productData: response.data,
          apiLoadedCount: this.state.apiLoadedCount + 1,
        });
      });
  }

  showData(productData) {
    const { sAdminProductChangeTab, sAdminProductIdSet } = this.props;

    const {
      createdAt,
      name,
      updatedAt,
      _id,
      category,
      brand,
      offer,
      overview,
      price,
      description,
      stock,
      subcategory,
      thumbnailImage,
      unit,
      // multipleImage,
      // numReviews,
      // rating,
      // reviews,
      // user,
    } = productData;

    const imageExists = checkFileExists(commonApi.api + thumbnailImage);

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
        <p className="h1 m-4">Product Details</p>

        <div className="container mb-2">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="rounded-circle imgPreview">
              <img
                className="rounded-circle"
                src={imageExists ? commonApi.api + thumbnailImage : no_image}
                alt="product img..."
              />
            </div>
          </div>
        </div>

        <table className="table table-hover table-bordered">
          <tbody>
            {/* <tr>
              <th scope="row" className="align-middle">
                Number of images
              </th>

              <td className="align-middle">{multipleImage.length}</td>
            </tr> */}

            <tr>
              <th scope="row" className="align-middle">
                Product Name
              </th>

              <td className="align-middle">{name}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Brand Name
              </th>

              <td className="align-middle">
                {brand && brand.name ? brand.name : "N/A"}
              </td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Category Name
              </th>

              <td className="align-middle">{category.name}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Subcategory Name
              </th>

              <td className="align-middle">{subcategory.name}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Product Unit
              </th>

              <td className="align-middle">{unit}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Product in stock
              </th>

              <td className="align-middle">{stock + " Unit"}</td>
            </tr>

            <tr>
              <th scope="row" className="align-middle">
                Regular Price
              </th>

              <td className="align-middle">{price + " Taka / Unit"}</td>
            </tr>

            {(!offer || (offer && !offer.hasOffer)) && (
              <tr>
                <th scope="row" className="align-middle">
                  Offer Availability
                </th>

                <td className="align-middle">No offer available</td>
              </tr>
            )}

            {offer && offer.hasOffer && (
              <>
                <tr>
                  <th scope="row" className="align-middle">
                    Percentage of discount
                  </th>

                  <td className="align-middle">
                    {offer.discountPercentage + " %"}
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="align-middle">
                    Price after discount
                  </th>

                  <td className="align-middle">
                    {offer.discountPrice + " Taka / Unit"}
                  </td>
                </tr>
              </>
            )}

            <tr>
              <th scope="row" className="align-middle">
                Product Description
              </th>

              <td className="align-middle">{description}</td>
            </tr>

            {/* <tr>
              <th scope="row" className="align-middle">
                Number of reviews
              </th>

              <td className="align-middle">{numReviews}</td>
            </tr> */}

            <tr>
              <th scope="row" className="align-middle">
                Overview of Product
              </th>

              <td className="align-middle">{overview}</td>
            </tr>

            {/* <tr>
              <th scope="row" className="align-middle">
                Rating
              </th>

              <td className="align-middle">{rating}</td>
            </tr> */}

            <tr>
              <th scope="row" className="align-middle">
                Created At
              </th>

              <td className="align-middle">
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
              <th scope="row" className="align-middle">
                Last Updated At
              </th>

              <td className="align-middle">
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
            sAdminProductChangeTab("Edit Product Details");
            sAdminProductIdSet(_id);
          }}
        >
          Edit Product Data Now
        </button>

        <button
          className="btn btn-primary back-button mt-2 mb-2 btn-block"
          type="button"
          onClick={() => {
            sAdminProductChangeTab("Product List");
          }}
        >
          Back To Product List
        </button>
      </>
    );
  }

  render() {
    const { totalApiCount, apiLoadedCount, productData } = this.state;

    // console.log("check state", this.state);

    return apiLoadedCount < totalApiCount ? (
      <FullPageLoader />
    ) : (
      productData && this.showData(productData)
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

const connectedSAdminProductDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminProductDetails);

export { connectedSAdminProductDetails as SAdminProductDetails };
