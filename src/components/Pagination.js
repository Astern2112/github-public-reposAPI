import React from "react";
import "../Styles/Pagination.css";

export default function Pagination({ gotoNextPage, gotoPrevPage, pageIndex }) {
  return (
    <div className="navbar">
      <button onClick={gotoPrevPage}>❮ Previous</button>

      <p className="pageIndex">Page {pageIndex}</p>
      <button onClick={gotoNextPage}>Next ❯ </button>
    </div>
  );
}
