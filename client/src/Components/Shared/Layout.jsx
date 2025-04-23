import React from "react";
import Navbar from "./Navbar";
import Loader from "./Loader";

const Layout = ({ children, loading }) => {
  return (
    <>
      <Navbar scroll={false} />
      {loading ? <Loader /> : <div className="relative top-14">{children}</div>}
    </>
  );
};

export default Layout;
