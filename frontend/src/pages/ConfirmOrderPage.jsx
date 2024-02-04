import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";

const ConfirmOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/order/" + id).then(({ data }) => {
      setOrder(data);
      setProducts(data.products);
    });
  });

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg text-text p-8 flex flex-col gap-8 justify-center items-center">
        <div className="flex gap-2 items-center">
          <h1 className="text-5xl">Order Confirmed</h1>
          <PiSealCheckFill className="text-green-600" size={25} />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Order ID: {id}</h1>
        </div>
        <div>
          <h1 className="text-xl text-center underline underline-offset-4 mb-4">
            Ordered Items{" "}
          </h1>
          <div className="flex flex-col gap-8">
            {products?.length > 0 &&
              products.map((item, i) => (
                <div key={i} className="flex gap-8 justify-center items-center">
                  <img
                    className="w-[7%] h-[14%] rounded-xl"
                    src={`http://localhost:5000/uploads/${item.product.images[0]}`}
                    alt=""
                  />
                  <div className="w-[40%] text-center">
                    <h2>{item.product.title}</h2>
                  </div>
                  <span>{item.quantity} pairs</span>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h1>Date: {order?.orderDate}</h1>
        </div>
        <Link to={"/"} className="bg-text text-mainBg px-4 py-2 rounded-md">
          Continue shopping
        </Link>
      </div>
    </>
  );
};

export default ConfirmOrderPage;
