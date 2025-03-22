import React from "react";
import Navigation from "./component/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const NoFooterLayout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <h1>No footer layout</h1>
        <Outlet />
      </main>
    </>
  );
};

export default NoFooterLayout;
