import React from "react";
import "../Styles/Pagination.css";

export default function Pagination({ gotoNextPage, gotoPrevPage, pageIndex }) {
  return (
    <nav className="navbar">
      <button onClick={gotoPrevPage}>Previous</button>
      <h4>{pageIndex}</h4>
      <button onClick={gotoNextPage}>Next</button>
    </nav>
  );
}
