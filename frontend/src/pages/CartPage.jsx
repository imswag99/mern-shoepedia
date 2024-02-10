import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, setCart, isAddedToCart, setIsAddedToCart } =
    useContext(ProductContext);

  useEffect(() => {
    const cartProdId = localStorage.getItem("addToCart");
    if (!cartProdId) return;
    setIsAddedToCart(JSON.parse(cartProdId));

    const cartItems = localStorage.getItem("cart");
    if (!cartItems) return;
    setCart(JSON.parse(cartItems));
  }, []);

  const removeFromCart = (id) => {
    const updatedIsAddedToCart = isAddedToCart.filter((pid) => pid !== id);
    const updatedCart = cart.filter((cartItem) => cartItem.product._id !== id);

    setIsAddedToCart(updatedIsAddedToCart);
    setCart(updatedCart);

    localStorage.setItem("addToCart", JSON.stringify(updatedIsAddedToCart));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  const handleSize = (e, id) => {
    let newSize = e.target.value;
    const updatedCart = cart.map(item => {
      // this part has changed the game for me
      if(item.product._id === id) {
        return {...item, size: newSize}
      }
      return item;
    });
    setCart(updatedCart);
     // made it correct accidently | updated the previous cart with new size at localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantity = (e, id) => {
    let newQuantity = e.target.value;
    const updatedCart = cart.map(item => {
      if(item.product._id === id) {
        return {...item, quantity: newQuantity}
      }
      return item;
    });
    setCart(updatedCart);
    // made it correct accidently | updated the previous cart with new quantity at localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg flex flex-col text-text gap-8 items-center p-8">
        <div className="w-full ">
          {cart.length === 0 && (
            <h1 className="text-2xl text-center">Your cart is empty</h1>
          )}

          {cart.length > 0 && <h1 className="text-4xl mb-8">Cart</h1>}

          {cart.length > 0 &&
            cart.map((cartItem, i) => (
              <div
                key={i}
                className="w-full mb-8 flex cursor-pointer border border-text bg-transparent rounded-2xl overflow-hidden relative"
              >
                <div className="flex w-16 bg-gray-300 shrink-0 overflow-hidden">
                  <img
                    className="object-cover grow hover:scale-125 transition-all"
                    src={`https://shoepedia-ecom.onrender.com/uploads/${cartItem.product.images[0]}`}
                    alt=""
                  />
                </div>
                <div className="w-full flex justify-between items-center gap-2 px-4 py-2 text-text">
                  <div className="w-[30%]">
                    <h3 className="text-md">
                      {cartItem.product.brand} {cartItem.product.title}
                    </h3>
                  </div>
                  <div className="w-[10%]">
                    <h3 className="text-md capitalize">
                      {cartItem.product.gender}
                    </h3>
                  </div>
                  <div className="w-[15%]">
                    <select
                      value={cartItem.size}
                      onChange={(e) => handleSize(e, cartItem.product._id)}
                      required
                    >
                      <option>size</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                    </select>
                  </div>
                  <div className="w-[15%]">
                    <input
                      type="number"
                      placeholder="quantity"
                      min={1}
                      value={
                        cartItem.quantity >= cartItem.product.stock
                          ? cartItem.product.stock
                          : cartItem.quantity && cartItem.quantity < 0
                          ? 0
                          : cartItem.quantity
                      }
                      max={cartItem.product.stock}
                      onChange={(e) => handleQuantity(e, cartItem.product._id)}
                    />
                  </div>
                  <div className="w-[10%]">
                    <h2 className="text-lg font-bold">
                      ${cartItem.product.price * cartItem.quantity}
                    </h2>
                  </div>
                  <button
                    onClick={() => removeFromCart(cartItem.product._id)}
                    className="text-text bg-transparent transition-all hover:text-red-600"
                  >
                    <IoTrashBin />
                  </button>
                </div>
              </div>
            ))}
          {cart.length > 0 && (
            <div className="w-full flex justify-end">
              <div className="bg-text text-mainBg text-xl font-semibold flex flex-col justify-between rounded-xl py-4 px-8">
                <h1 className="uppercase">Cart items: {cart.length}</h1>
                <h1 className="mt-2 uppercase">Cart total: ${cartTotal()}</h1>
                <Link to={"/address"} className="w-full text-center bg-mainBg rounded-xl text-text p-3 mt-8 transition-all hover:bg-green-600">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
