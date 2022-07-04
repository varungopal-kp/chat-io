import React from "react";

export default function index(props) {
  return (
    <h6>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.handleLogout();
        }}
      >
        Logout
      </a>
    </h6>
  );
}
