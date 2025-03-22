import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navigation from "./../DefaultLayout/components/Navigation/index";

function AdminLayout() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <h1>Admin Layout</h1>
        <Outlet />
      </main>
    </>
  );
}

export default AdminLayout;
