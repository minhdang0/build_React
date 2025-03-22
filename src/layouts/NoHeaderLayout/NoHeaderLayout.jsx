import React from "react";
import { Outlet } from "react-router-dom";

const NoHeaderLayout = () => {
  return (
    <>
      <h1>NoHeader Layout</h1>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
};

export default NoHeaderLayout;
