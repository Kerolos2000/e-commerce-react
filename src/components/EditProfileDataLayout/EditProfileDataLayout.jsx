import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import style from "./EditProfileDataLayout.module.css";

export default function EditProfileData({ userData, setUserData }) {
  let { data } = useAxios(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData?.id}`
  );

  return (
    <>
      <div className="m-0 py-3 row">
        <div className="col-lg-3 mb-3">
          {userData !== null ? (
            <h2 className="text-center">Hi, {userData.name}</h2>
          ) : null}

          <hr />
          <ul className="navbar-nav">
            <NavLink to="./">
              <li className={`${style.navItem} nav-item h5`}>Your Shipments</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "activeList" : "")}
              to="updatePassword"
            >
              <li className={`${style.navItem} nav-item h5`}>
                Update Password
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="col-lg-9">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
