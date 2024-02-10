import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/order/user-orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg flex flex-col text-text gap-8 items-center px-8">
        <div className="w-full ">
          <AccountNav />
          <h1 className="text-4xl my-8">My previous orders</h1>
          {orders.length > 0 &&
            orders.map((order, i) => (
              <div
                key={i}
                className="w-full mb-8 flex gap-6 flex-col cursor-pointer border border-text bg-transparent rounded-2xl overflow-hidden relative"
              >
                <div className="text-lg font-semibold p-4">Order date: {order.orderDate}</div>
                {order.products.map((product) => (
                  <div className="flex p-4">
                    <div className="flex w-16 bg-gray-300 shrink-0 overflow-hidden rounded-xl">
                      <img
                        className="object-cover grow hover:scale-125 transition-all"
                        src={`https://shoepedia-ecom.onrender.com/uploads/${product.product.images[0]}`}
                        alt=""
                      />
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 px-4 py-2 text-text">
                      <div className="w-[30%]">
                        <h3 className="text-md">
                          {product.product.brand} {product.product.title}
                        </h3>
                      </div>
                      <div className="w-[10%]">
                        <h3 className="text-md capitalize">
                          {product.product.gender}
                        </h3>
                      </div>
                      <div className="w-[15%]">
                        <h1>Size-{product.size}</h1>
                      </div>
                      <div className="w-[15%]">
                        <h1>Quantity-{product.quantity}</h1>
                      </div>
                      <div className="w-[10%]">
                        <h2 className="text-lg font-bold">
                          ${product.product.price * product.quantity}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-lg font-semibold p-4">Order total: ${order.amount}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
