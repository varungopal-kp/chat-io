import React, { useState } from "react";
import LoginPage from "./login";
import OtpPage from "./otp";

export default function Index() {
  require("./style.css");
  const [page, setPage] = useState("loginPage");

  const handlePage = (page) => {
    setPage(page);
  };

  if (page == "loginPage") {
    return <LoginPage handlePage={handlePage}/>;
  } else {
    return <OtpPage handlePage={handlePage}/>;
  }
}
