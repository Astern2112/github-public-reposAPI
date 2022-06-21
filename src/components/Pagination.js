import React from "react";
import "../Styles/Pagination.css";

export default function Pagination({ gotoNextPage, gotoPrevPage, pageIndex }) {
  return (
    <div className="navbar">
      <button id="PrevButton" onClick={gotoPrevPage} disabled={pageIndex === 1}>
        {" "}
        ❮ Previous{" "}
      </button>
      <p className="pageIndex"> Page {pageIndex}</p>
      <button id="NextButton" onClick={gotoNextPage}>
        Next ❯{" "}
      </button>
    </div>
  );
}
