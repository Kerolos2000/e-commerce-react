import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import useNotify from "../../Hooks/useNotify";
import Loader from "../Loader/Loader";
import MainBtn from "../MainBtn/MainBtn";
import style from "./ProductDetails.module.css";
import Slider from "../Slider/Slider";
import axios from "axios";

export default function ProductDetails({ userData }) {
  let { ToastContainer, notify } = useNotify();
  let prams = useParams();
  let [btnIsLoading, setBtnislaoding] = useState(false);
  let [isError, setIsError] = useState(null);
  let { data, isLoading } = useAxios(
    `https://route-ecommerce-app.vercel.app/api/v1/products/${prams.id}`
  );
  let navigate = useNavigate();
  function addToCart() {
    if (userData === null) {
      navigate("/login");
    } else {
      sendToCart();
    }
  }

  function sendToCart() {
    setBtnislaoding(true);
    axios
      .post(
        "https://route-ecommerce-app.vercel.app/api/v1/cart",
        { productId: prams.id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        setBtnislaoding(false);
        notify("product has been added to cart");
      })
      .catch((err) => {
        setBtnislaoding(false);
        setIsError(err);
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row g-3 py-3">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="col-md-3">
                {/* <img className="img-fluid" src={data?.data?.imageCover} alt=""/> */}
                <Slider dots={false}>
                  {data?.data?.images.map((el, i) => (
                    <img key={i} className="img-fluid" src={el} alt="" />
                  ))}
                </Slider>
              </div>
              <div className="col-md-9 d-flex align-items-center">
                <div className={`w-100 ${style.card}`}>
                  <h2 className="h5 fw-bold text-capitalize mb-2">
                    {data?.data?.title}
                  </h2>
                  <p className={`${style.categoryName} mb-3`}>
                    {data?.data?.description}
                  </p>
                  <p className={`${style.categoryName} mb-2`}>
                    {data?.data?.category.name}
                  </p>
                  <div className="d-flex justify-content-between">
                    <h4 className="h6 fw-bold">{data?.data?.price} EGP</h4>
                    <h4 className="h6 fw-bold">
                      <i className={`starIcon fa-solid fa-star`}></i>{" "}
                      {data?.data?.ratingsAverage}
                    </h4>
                  </div>

                  {btnIsLoading ? (
                    <MainBtn
                      theam={"main-btn"}
                      icon={"fa-solid fa-spinner fa-spin-pulse"}
                      width={"w-100"}
                      text={"loading"}
                    />
                  ) : (
                    <MainBtn
                      theam={"main-btn"}
                      functions={addToCart}
                      icon={"fa-solid fa-plus"}
                      width={"w-100"}
                      text={"Add To Cart"}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
