import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Page you're looking for is not found</h1>
      <Link to="/" className="btn btn-primary m-3   p-1">
        Home
      </Link>
    </div>
  );
};

export default Error;
