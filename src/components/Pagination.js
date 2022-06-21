import React from "react";
import "../Styles/Pagination.css";

export default function Pagination({ gotoNextPage, gotoPrevPage, pageIndex }) {
  return (
    <nav>
      <form className="page-input-form">
        <label htmlFor="page-input" className="page-input-label">
          Go to page{" "}
        </label>
        <input type="number" id="page-input" min={1} placeholder={pageIndex} />
        <button type="submit" className="page-input-form-btn">
          Go
        </button>
      </form>

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

// current page, n+1, n+2, n+3, ... + arr.length-1
