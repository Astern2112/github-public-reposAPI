import React from "react";
import "../Styles/Pagination.css";

export default function Pagination({ gotoNextPage, gotoPrevPage, pageIndex }) {
  return (
    <div className="navbar">
      <button onClick={gotoPrevPage}>❮ Previous</button>
      <h4 className="pageIndex">{pageIndex}</h4>
      <button onClick={gotoNextPage}>Next ❯ </button>
    </div>
  );
}
