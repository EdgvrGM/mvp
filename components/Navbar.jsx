import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import Button from "./Button";
import { loginGoogle, logoutGoogle, onAuthStateChangedControl } from "../firebase/client";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChangedControl(setUser)
  }, [])

  const handleClick = () => {
    loginGoogle()
    .then(setUser).catch(err => {
      console.log(err)
    })
  }

  const handleClick2 = () => {
    logoutGoogle()
  }


  return (
    <div className="navbar-container">
      { user === null ? <Button onClick={handleClick}>Iniciar Sesion</Button>
      : <div>
        <strong>{user.email}</strong>
        <Button onClick={handleClick2}>Salir</Button>
      </div>
      }
      

      <p className="logo">
        <Link href="/">edgxr shop</Link>
      </p>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
