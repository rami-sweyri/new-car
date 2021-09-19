import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mainColor, background } from "../../styles/mainColors";
import { schema, validator } from "../../validation/loginSchema";
import _objO from "../../utils/_objO";
import _objI from "../../utils/_objI";
import { loginUser, loadUser } from "../../redux/actions/auth";
import { useHistory } from "react-router-dom";
export default function Login({ toggleEvent, toggle }) {
  const [errorValidation, setErrorValidation] = useState({});
  const [toggleLogin, setToggleLoggin] = useState(toggle ? toggle : false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [responseMessage, setRespondseMessage] = useState(null);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    validator(
      schema,
      {
        email: formData.email,
        password: formData.password,
      },
      setErrorValidation
    );
  }, [formData]);
  useEffect(() => {
    setErrorValidation({});
  }, []);
  useEffect(() => {
    setToggleLoggin(toggle);
  }, [toggle]);
  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    if (_objO(errorValidation)) {
      console.log(formData);
      dispatch(loginUser(formData))
        .then((res) => {
          console.log({ res });
          setRespondseMessage(res.message);

          if (res.status === 200) {
            dispatch(loadUser()).then((res) => {
              if (res.status === 200) {
                history.push("/admin/");
              } else {
                return setRespondseMessage(res.status);
              }
            });
          } else {
            setRespondseMessage("Email or password are incorrect!!");
          }
        })
        .catch((err) =>
          setRespondseMessage("Something went wrong, please try again later!!")
        );
    }
  };
  return (
    <div
      className={`signUp absolute  bg-white shadow-md hover:shadow-lg w-11/12 sm:w-96 px-5 rounded py-4  border max-w-screen overflow-hidden transition-all  ${
        toggleLogin ? `` : `inactive-sx`
      } active-sx`}
    >
      <div
        style={{ backgroundColor: mainColor }}
        className={`
             shadow-lg ${
               authReducer.loading ? `animate-pulse` : ``
             } my-4 border rounded p-5 text-white font-semibold text-center text-lg transform transition-all duration-500 overflow-hidden  z-50`}
      >
        Login
      </div>
      <div
        className={`  ${
          responseMessage === null ? ` -translate-x-full` : ` translate-x-0`
        } my-2 text-center text-sm transform transition-all duration-500 text-red-600 z-10`}
      >
        {responseMessage}
      </div>
      <div className="my-2">
        <div className="py-1 font-medium text-gray-700">Email:</div>
        <input
          type="email"
          placeholder="Email"
          autocomplete={false}
          reqired
          name="email"
          value={formData.email}
          onChange={(e) => {
            onChange(e);
          }}
          onClick={() => setTouched({ ...touched, email: true })}
          className="w-full px-2 py-3 bg-white border rounded shadow-md outline-none focus:outline-none focus:border-black "
        />
        {errorValidation && errorValidation.email ? (
          <p className="my-1 text-xs text-red-500 ">{errorValidation.email}</p>
        ) : (
          ""
        )}
      </div>
      <div className="my-2">
        <div className="py-1 font-medium text-gray-700">Password:</div>
        <input
          onClick={() => setTouched({ ...touched, password: true })}
          type="password"
          name="password"
          placeholder="Password"
          reqired
          value={formData.password}
          onChange={(e) => onChange(e)}
          className="w-full px-2 py-3 bg-white border rounded shadow-md outline-none focus:outline-none focus:border-black"
        />
        {errorValidation && errorValidation.password ? (
          <p className="my-1 text-xs text-red-500">
            {errorValidation.password}
          </p>
        ) : (
          ""
        )}
      </div>
      <div
        style={{ color: mainColor }}
        className="text-sm text-green-800 underline cursor-pointer"
        onClick={() => (toggleEvent ? toggleEvent(false) : null)}
      >
        Forgat your password?
      </div>
      <div className="flex items-center justify-center w-full px-4 py-6">
        <button
          onClick={submit}
          style={{
            backgroundColor: _objI(errorValidation) ? "#666" : mainColor,
            borderColor: mainColor,
          }}
          className=""
          disabled={_objI(errorValidation)}
          className={`   border
              w-10/12 ${
                _objI(errorValidation) ? `cursor-not-allowed` : ``
              }  px-12 py-3 border-green-700 rounded shadow-md hover:shadow-lg outline-none focus:outline-none  bg-green-600 text-white hover:bg-green-700 relative`}
        >
          {authReducer.loading ? (
            <svg
              className="absolute w-5 h-5 mr-3 border-r-2 border-white rounded-full animate-spin left-3"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            ""
          )}
          LOGIN
        </button>
      </div>
    </div>
  );
}
