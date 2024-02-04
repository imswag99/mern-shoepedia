import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PaymentsPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
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

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  const cartDescription = () => {
    let prodTitles = "";
    cart.map((cartItem) => {
      prodTitles += cartItem.product.title + " ";
    });
    return prodTitles;
  };

  const createOrder = (data, actions) => {
    let cartDesc = cartDescription();
    let cartAmount = cartTotal();
    return actions.order.create({
      purchase_units: [
        {
          description: cartDesc,
          amount: {
            currency_code: 'USD',
            value: cartAmount
          }
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    })
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const onApprove = (data, actions) => {
    let done = false;
    actions.order.capture().then(function (details) {
      const { payer } = details;
      done = true;
      setSuccess(done);
      if(done) {
        orderByPaypal();
      }
    });
  };

  const onError = (data, actions) => {
    alert("An error occured with your payment");
  };

  const orderByCod = async () => {
    let cartAmount = cartTotal();
    let orderDate = getDate();
    const orderData = {
      cart,
      cartAmount,
      orderDate
    };

    const { data } = await axios.post("/order", orderData);
    setCart([]);
    setIsAddedToCart([]);
    localStorage.setItem("addToCart", []);
    localStorage.setItem("cart", []);
    setOrderId(data._id);
    setRedirect(true);
  };

  const orderByPaypal = async () => {
    let cartAmount = cartTotal();
    let orderDate = getDate();
    const orderData = {
      cart,
      cartAmount,
      orderDate
    };

    const { data } = await axios.post("/order/paypal", orderData);
    setCart([]);
    setIsAddedToCart([]);
    localStorage.setItem("addToCart", []);
    localStorage.setItem("cart", []);
    setOrderId(data._id);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/confirm/" + orderId} />;
  }

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg flex flex-col text-text gap-8 items-center p-8 justify-center">
        <div className="w-full ">
          {cart.length > 0 &&
            cart.map((cartItem, i) => (
              <div
                key={i}
                className="w-full mb-8 flex cursor-pointer border border-text bg-transparent rounded-2xl overflow-hidden relative"
              >
                <div className="flex w-16 bg-gray-300 shrink-0 overflow-hidden">
                  <img
                    className="object-cover grow hover:scale-125 transition-all"
                    src={`http://localhost:5000/uploads/${cartItem.product.images[0]}`}
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
                    <h1>Size-{cartItem.size}</h1>
                  </div>
                  <div className="w-[15%]">
                    <h1>Quantity-{cartItem.quantity}</h1>
                  </div>
                  <div className="w-[10%]">
                    <h2 className="text-lg font-bold">
                      ${cartItem.product.price * cartItem.quantity}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          <div className="flex justify-end pr-[6.5rem]">
            <h1 className="text-3xl font-bold">Total : ${cartTotal()}</h1>
          </div>
          {cart.length > 0 && (
            <div className="flex flex-col gap-6 items-center mt-16">
              <button
                onClick={orderByCod}
                className="w-[40%] text-center bg-text text-mainBg text-xl italic font-semibold py-3 rounded-md"
              >
                Buy now with COD
              </button>
              <h1 className="uppercase text-center text-lg text-text">
                Or pay with paypal
              </h1>
              <PayPalButtons
                onApprove={onApprove}
                onError={onError}
                createOrder={createOrder}
                className="w-[40%]"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;
