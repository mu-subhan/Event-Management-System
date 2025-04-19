import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar scroll={false} />
      <div className="relative top-14">{children}</div>
    </>
  );
};

export default Layout;
