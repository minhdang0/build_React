import React from "react";
import useCounter from "../hooks/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [count, increase] = useCounter(10);
  return (
    <>
      <button onClick={increase}>Count is {count}</button>
      <FontAwesomeIcon icon={faBell} shake />
    </>
  );
}

export default Home;
