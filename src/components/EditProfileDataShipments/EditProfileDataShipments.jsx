import React from "react";
import Loader from "../Loader/Loader";
import useAxios from "../../Hooks/useAxios";
import style from "./EditProfileDataShipments.module.css";

export default function EditProfileDataShipments({ userData, setUserData }) {
  let { data, isLoading } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData?.id}`
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          <h2>Your Shipments Details :</h2>
          <hr />
          {data.map((el, i) => (
            <div key={i} className="col-12">
              {/* {console.log(data)} */}
              <div className="row">
                {el.cartItems.map((el, i) => (
                  <div key={i} className="col-6">
                    <div>
                      <img
                        className="img-fluid"
                        src={el.product.imageCover}
                        alt=""
                      ></img>
                      <p className={` m-0`}>{el.product.category.name}</p>
                      <h3 className="h5 fw-bold text-capitalize mb-3">
                        {el.product.title.split(" ").slice(0, 2).join(" ")}{" "}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <h4 className="h6 fw-bold">
                          {el.product.price}
                          EGP
                        </h4>
                        <h4 className="h6 fw-bold">
                          <i className={`starIcon fa-solid fa-star`}></i>
                          {el.product.ratingsAverage}{" "}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
              <div className="card p-2 bg-light">
                <div className="row">
                  <div className={`${style.mainDiv} col-6`}>
                    <p>Shipping Price :</p>
                    <p> {el.totalOrderPrice}</p>
                  </div>
                  <div className={`${style.mainDiv} col-6`}>
                    <p>Created At :</p>
                    <p> {el.createdAt.split("").slice(0, 10)}</p>
                  </div>
                  <div className={`${style.mainDiv} col-6`}>
                    <p>Payment Method :</p>
                    <p> {el.paymentMethodType}</p>
                  </div>
                  <div className={`${style.mainDiv} col-6`}>
                    <p>Order Status :</p>
                    <p>
                      {" "}
                      {el.isDelivered === false
                        ? `Not Arrived Yet`
                        : `Have Already Arrived`}{" "}
                    </p>
                  </div>
                  <div className={`${style.mainDiv} col-6`}>
                    <p>Payment Status :</p>
                    <p>
                      {" "}
                      {el.isPaid === false
                        ? `Not Paid Yet`
                        : `Have Already Paid`}{" "}
                    </p>
                  </div>
                  <div className={`${style.mainDiv} col-6`}>
                    <p>
                      {" "}
                      {el?.shippingAddress?.details} /{" "}
                      {el?.shippingAddress?.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}{" "}
        </div>
      )}
    </>
  );
}
