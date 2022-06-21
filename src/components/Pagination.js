import React, { useContext } from "react";
import { PageContext } from "../App";
import "../Styles/Pagination.css";

export default function Pagination() {
  let { gotoNextPage, gotoPrevPage, pageIndex, gotoPage, pageInput } =
    useContext(PageContext);
  return (
    <nav>
      <div className="page-input-form">
        <label htmlFor="page-input" className="page-input-label">
          Go to page{" "}
        </label>
        <input
          type="number"
          id="page-input"
          min={1}
          placeholder={pageIndex}
          ref={pageInput}
        />
        <button className="page-input-form-btn" onClick={gotoPage}>
          Go
        </button>
      </div>

      <div className="navbar">
        <button
          className="prevButton"
          onClick={gotoPrevPage}
          disabled={pageIndex === 1}
        >
          {" "}
          ❮ Previous{" "}
        </button>

        <div className="page-buttons">
          <button
            className="prevPage"
            onClick={gotoPrevPage}
            disabled={pageIndex === 1}
          >
            {pageIndex - 1}
          </button>
          <button className="currentPage">{pageIndex}</button>
          <button className="nextPage" onClick={gotoNextPage}>
            {pageIndex + 1}
          </button>
        </div>

        <button className="nextButton" onClick={gotoNextPage}>
          Next ❯{" "}
        </button>
      </div>
    </nav>
  );
}
