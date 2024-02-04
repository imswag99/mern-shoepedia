import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlisted, setWishlisted } = useContext(ProductContext);

  useEffect(() => {
    const wishlist = localStorage.getItem("wishlisted");
    if (!wishlist) return;
    setWishlisted(JSON.parse(wishlist));
  }, []);

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg flex gap-6 justify-center px-8 py-8">
        {wishlisted.length > 0 && (
          <div>
            <h1 className="text-text text-4xl my-2">Wishlist</h1>
            <div className="mt-8 grid gap-x-6 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlisted.map((product, i) => (
                <Link
                  key={i}
                  className="mb-8 relative"
                  to={`/products/${product._id}`}
                >
                  <div className="flex h-[70%] bg-gray-300 overflow-hidden rounded-2xl shadow-md shadow-black">
                    <img
                      className="object-cover grow hover:scale-125 transition-all"
                      src={`http://localhost:5000/uploads/${product.images[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between gap-2 px-4 py-2 text-text">
                    <h3 className="uppercase font-semibold">{product.brand}</h3>
                    <h3 className="text-lg">{product.title}</h3>
                    <h3 className="text-md capitalize">
                      {product.gender} {product.category}
                    </h3>
                    <h3 className="text-md font-light">${product.price}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {wishlisted.length === 0 && (
          <div className="text-center text-text">
            <h1 className="text-xl">Add items to your wishlist</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
