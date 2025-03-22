import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";

function DefaultLayout() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api01.f8team.dev/api/auth/logout", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      if (!res.ok) {
        throw new Error("Đăng xuất thất bại");
      }

      localStorage.removeItem("token")
      navigate("/"); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <Navigation />
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <h1>DefaultLayout</h1>
        <Outlet />
      </main>
    </>
  );
}

export default DefaultLayout;
