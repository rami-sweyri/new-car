import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
export default function Table({ children, Thead }) {
  return (
    <table className="border-collapse w-full shadow-lg hover:shadow-lg table-auto ">
      <thead>
        <tr>
          {/* {Thead.length > 0 ? Thead.map((item) => item) : ""} */}
          {Thead}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
