import React, { useContext, useEffect, useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa6";
import { IoBagHandleOutline, IoCartOutline } from "react-icons/io5";
import { GiRunningShoe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo.png";
import { ProductContext } from "../context/ProductContext";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(ProductContext);
  const [cartLength, setCartLength] = useState();

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (!cartItems) return;
    setCart(JSON.parse(cartItems));
  }, [])

  useEffect(() => {
    noOfItems();
  }, [cart])

  const showSpan = (text) => {
    if (showSidebar) {
      return (
        <span className="lg:block md:block sm:hidden transition-all hover:translate-x-2">
          {text}
        </span>
      );
    }
  };

  const noOfItems = () => {
    setCartLength(cart.length);
  }

  return (
    <div
      onMouseEnter={() => setShowSidebar(true)}
      onMouseLeave={() => setShowSidebar(false)}
      className="w-[4%] bg-primary text-text h-screen transition-all flex flex-col justify-between items-center p-4 hover:w-[15%] fixed z-50"
    >
      <div className="flex flex-col gap-10 items-center">
        <div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/"}>
              {showSidebar && <img className="w-40 h-40" src={logo} alt="" />}

              {!showSidebar && <GiRunningShoe size={30} />}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/products"}>
              <IoBagHandleOutline size={20} />
              {showSpan("Shop")}
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/wishlist"}>
              <FaRegHeart size={20} />
              {showSpan("Wishlist")}
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center relative" to={"/cart"}>
              <IoCartOutline size={20} />
              <h3 className="bg-text text-mainBg text-xs font-semibold px-1 rounded-full absolute -top-1.5 -left-1.5">
                {cartLength}
              </h3>
              {showSpan("Cart")}
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <Link
            to={user ? "/account" : "/login"}
            className="flex gap-1 items-center"
          >
            <FaRegUser size={25} />
            {!!user && showSpan(user.name)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
