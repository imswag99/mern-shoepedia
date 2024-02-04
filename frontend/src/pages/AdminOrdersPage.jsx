import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/order").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const evenOrOdd = (index) => {
    let classname = "bg-adminPrimary text-text";
    if (index % 2 == 0) {
      classname = "bg-primary text-text";
    }
    return classname;
  };

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="w-[85%] bg-text p-8 text-adminPrimary">
        <h1 className="text-4xl">Orders</h1>
        <table className="w-full mt-8 rounded-xl overflow-hidden">
          <thead>
            <tr className="w-full bg-adminPrimary text-text">
              <td className="text-[0.6rem] font-bold text-left pl-8 py-4">
                ORDER ID
              </td>
              <td className="text-[0.6rem] font-bold py-4">CUSTOMER ID</td>
              <td className="text-[0.6rem] font-bold py-4">CUSTOMER NAME</td>
              <td className="text-[0.6rem] font-bold py-4">PRODUCTS</td>
              <td className="text-[0.6rem] font-bold py-4">ORDER TOTAL</td>
              <td className="text-[0.6rem] font-bold py-4">DELIVERY ADDRESS</td>
              <td className="text-[0.6rem] font-bold py-4">PAYMENT MODE</td>
              <td className="text-[0.6rem] font-bold py-4">PAYMENT STATUS</td>
              <td className="text-[0.6rem] font-bold text-right pr-8 py-4">
                DELIVERY STATUS
              </td>
            </tr>
          </thead>
          <tbody className="text-[0.5rem]">
            {orders.length > 0 &&
              orders.map((order, i) => (
                <tr key={i} className={evenOrOdd(i)}>
                  <td className="py-3 text-left pl-8">{order._id}</td>
                  <td className="py-3">{order.user._id}</td>
                  <td className="py-3">{order.user.name}</td>
                  {order.products.map((item, j) => (
                    <td key={j} className="py-3 flex flex-col">
                      <div className="w-full flex gap-4">
                        <div className="text-center">
                          <h2>{item.product.title}</h2>
                        </div>
                        <span>{item.quantity} pairs</span>
                      </div>
                    </td>
                  ))}
                  <td className="py-3">${order.amount}</td>
                  <td className="py-3">
                    {order.user.address.house +
                      ", " +
                      order.user.address.locality +
                      ", " +
                      order.user.address.pincode +
                      ", " +
                      order.user.address.city +
                      ", " +
                      order.user.address.state +
                      ", " +
                      order.user.address.country}
                  </td>
                  <td className="py-3">{order.paymode}</td>
                  <td className="py-3">{order.paystatus}</td>
                  <td className="py-3 text-right pr-8">{order.delstatus}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrdersPage;
