import React, { useState, useEffect } from "react";
// import _objI from "../../utils/_objI";
import { creteSchema, validator } from "../../validation/loginSchema";
import { useSelector, useDispatch } from "react-redux";
// import { loginUser } from "../../redux/actions/auth";
import { mainColor, background } from "../../styles/mainColors";
import LoginCard from "./Login";
import SignUpCard from "./SignUp";
export default function Login({ history }) {
  const [toggleLogin, setToggleLogin] = useState(true);

  return (
    <div
      style={{ backgroundColor: mainColor }}
      className={` 
       h-screen w-screen flex flex-col justify-center items-center  `}
    >
      <div className="max-h-screen w-screen flex flex-col justify-center items-center">
        <LoginCard
          toggle={toggleLogin}
          toggleEvent={setToggleLogin}
          history={history}
        />
        <SignUpCard
          toggle={toggleLogin}
          toggleEvent={setToggleLogin}
          history={history}
        />
      </div>
    </div>
  );
}
