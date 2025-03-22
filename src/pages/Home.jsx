import React from "react";
import { Link } from "react-router-dom";
import useCounter from "../hooks/useCounter";

function Home() {
  const [count, increase] = useCounter(10);
  return (
    <>
      <button onClick={increase}>Count is {count}</button>
    </>
  );
}

export default Home;
