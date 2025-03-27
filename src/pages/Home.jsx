import React from "react";
import useCounter from "../hooks/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Home() {
  const [count, increase] = useCounter(10);

  const setIncrease = (e) => {
    e.preventDefault();
    increase(count + 1);
  }
  return (
    <>
      <Button onclick={setIncrease} icon={faBell} primary>Click {count}</Button>
      <Button onclick={setIncrease} icon={faFaceAngry} secondary loading size="medium">Click {count}</Button>
      <Button onclick={setIncrease} icon={faFacebook} round>Click {count}</Button>
      <Button onclick={setIncrease} icon={faInstagram} className=".btn-big" disabled size="large">Click {count}</Button>

    </>
  );
}

export default Home;
