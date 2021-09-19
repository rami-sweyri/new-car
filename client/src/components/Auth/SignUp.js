import React, { useState, useEffect } from "react";
import { mainColor, background } from "../../styles/mainColors";
import { schema, validator } from "../../validation/registerSchema";
export default function Login({ toggleEvent, toggle }) {
  const [errorValidation, setErrorValidation] = useState({});
  const [toggleLogin, setToggleLoggin] = useState(toggle ? toggle : false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  console.log(errorValidation);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  // useEffect(() => {
  //   validator(
  //     schema,
  //     {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       email: formData.email,
  //       password: formData.password,
  //     },
  //     setErrorValidation
  //   );
  // }, [formData]);
  useEffect(() => {
    setToggleLoggin(toggle);
  }, [toggle]);
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className={`signIn absolute  bg-white rounded w-11/12 sm:w-96  px-5 border shadow-md hover:shadow-lg    ${
        toggleLogin ? `inactive-dx` : `active-dx`
      } `}
    >
      <div
        style={{ backgroundColor: mainColor }}
        className={`shadow-lg  mt-4 border rounded p-3 text-white font-semibold text-center text-lg`}
      >
        Register
      </div>
      <div
        className={`w-full flex justify-evenly items-center  px-4   ${
          touched.password && errorValidation.password ? `py-8` : `py-8`
        }`}
      >
        <button
          style={{ color: mainColor }}
          className={` border text-green-800 bg-white px-4 py-2  rounded shadow-md hover:shadow-lg outline-none focus:outline-none hover:bg-green-900 hover:bg-opacity-10  ${
            touched.password && errorValidation.password
              ? `cursor-not-allowed opacity-60`
              : `cursor-pointer`
          }`}
          type="button"
          onClick={() => (toggleEvent ? toggleEvent(true) : null)}
        >
          BACK
        </button>

        <button
          style={{ backgroundColor: mainColor }}
          className=""
          disabled={touched.password && errorValidation.password}
          className={`  border
               ${``}
                 px-4 py-2 border-green-700 rounded shadow-md hover:shadow-lg outline-none focus:outline-none  bg-green-600 text-white hover:bg-green-700 ${``}`}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
