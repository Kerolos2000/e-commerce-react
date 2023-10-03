import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import style from "./FeaturedProducts.module.css";
import useNotify from "../../Hooks/useNotify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FeaturedProducts(props) {
  let { ToastContainer, notify } = useNotify();

  let navigate = useNavigate();
  function sendToWishlist(i) {
    if (localStorage.getItem("userToken") === null) {
      navigate("/e-commerce-react/login");
    } else {
      addToWishlist(i);
    }
  }

  let { data, isLoading } = useAxios(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  function addToWishlist(i) {
    toast.promise(
      axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId: data.data[i].id },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      ),
      {
        pending: "Wait for add product to your Wishlist",
        success: "product has been added to wishlist",
        error: "Something went wrong. Try again",
      }
    );
  }

  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <h2>{props.sectionTitle}</h2>
      <div className="container-fluid">
        <div className="row g-3 py-3">
          {isLoading ? <Loader /> : ""}
          {data?.data?.map((el, i) => (
            <div
              key={i}
              className={`col-sm-6 col-lg-4 col-xl-3 col-xxl-2 ${style.allCard}`}
            >
              <div className={`${style.card}`}>
                <div
                  onClick={() => {
                    sendToWishlist(i);
                  }}
                  className={`${style.wishlist}`}
                >
                  <i className="fa-regular fa-heart fa-2x"></i>
                </div>
                <Link to={`/e-commerce-react/productDetails/${el._id}`}>
                  <img className="img-fluid" src={el.imageCover} alt=""></img>
                  <p className={`${style.categoryName} m-0`}>
                    {el.category.name}
                  </p>
                  <h3 className="h5 fw-bold text-capitalize mb-3">
                    {el.brand.name} {el.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <h4 className="h6 fw-bold">{el.price} EGP</h4>
                    <h4 className="h6 fw-bold">
                      <i className={`starIcon fa-solid fa-star`}></i>{" "}
                      {el.ratingsAverage}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
