import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/product").then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="bg-mainBg w-[85%] flex flex-col items-center">
        <div className="lg:w-[20%] md:w-[35%] sm:w-[50%] p-8 flex">
          <Link
            to={"/admin/products/new"}
            className="inline-flex items-center justify-center gap-1 bg-primary p-2 w-full text-text uppercase font-semibold rounded-2xl transition-all hover:text-primary hover:bg-text"
          >
            <FaPlus />
            Add new product
          </Link>
        </div>
        <div className="w-full mt-2 px-8">
          {products.length > 0 &&
            products.map((product, i) => (
              <Link key={i} className="mb-8 flex cursor-pointer bg-primary rounded-2xl overflow-hidden relative" to={`/admin/products/${product._id}`}>
                <div className="flex w-32 bg-gray-300 shrink-0">
                  <img
                    className="object-cover grow"
                    src={`https://shoepedia-ecom.onrender.com/uploads/${product.images[0]}`}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between gap-2 px-4 py-2 text-text">
                  <h3 className="text-xl">{product.brand} {product.title}</h3>
                  <h3 className="uppercase">{product.gender}</h3>
                  <p className="line-clamp-1 overflow-hidden text-sm">{product.description}</p>
                  <h2 className="text-lg font-bold">${product.price}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminProductsPage;
