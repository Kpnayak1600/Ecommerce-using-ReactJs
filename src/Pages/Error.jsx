// Error.jsx

import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 Not Found</h1>
      <p style={styles.message}>
        You are not logged in. Please{" "}
        <Link to="/" style={styles.link}>
          log in
        </Link>
        to access the specified route.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  message: {
    fontSize: "1rem",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Error;
