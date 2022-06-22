import React from "react";
import "../Styles/Loading.css";

export default function Loading() {
  return (
    <div className="loading-screen">
      <h1 className="loading-title">Loading</h1>
      <div className="loading-spinner"></div>
    </div>
  );
}
