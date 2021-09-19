import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
// import adidasLogo from "../../images/SVG/adidas.svg";
// import world from "../../images/SVG/world.svg";
// import stansmith from "../../images/SVG/stansmith.svg";
export default function Index() {
  //   const dispatch = useDispatch();
  //   const authReducer = useSelector((state) => state.authReducer);
  //   useEffect(() => {
  //     dispatch(loadUser());
  //   }, []);
  //   console.log(authReducer);
  //   if (authReducer.loading) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="loader border-t-green-200 relative ease-linear rounded-full border-8 border-t-8  w-24 h-24 text-green-200"></div>
  //       </div>
  //     );
  //   } else {
  return (
    <Layout>
      <div className=" bg-white w-full h-screen flex justify-center items-center">
        Dashboard
      </div>
    </Layout>
  );
}
// }
