import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";

const IndexPage = () => {
  const { products } = useContext(ProductContext);
  const superstar = "SUPERSTAR X LEGO®";
  const timberland = "Premium 6-Inch Waterproof Boot";
  const predator = "PREDATOR ELITE FIRM GROUND BOOTS";

  const [superstarId, setSuperstarId] = useState();
  const [timberlandId, setTimberlandId] = useState();
  const [predatorId, setPredatorId] = useState();

  useEffect(() => {
    axios.get(`/product/single/${superstar}`).then(({ data }) => {
      setSuperstarId(data._id);
    })

    axios.get(`/product/single/${timberland}`).then(({ data }) => {
      setTimberlandId(data._id);
    })

    axios.get(`/product/single/${predator}`).then(({ data }) => {
      setPredatorId(data._id);
    })
  }, []);
  

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-text flex flex-col gap-4 items-center p-8">
        <Link to={"/products"} className="w-full">
          <img
            className="w-full rounded-xl"
            src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/21254ece-bbb3-457a-bcdc-3af7b7a73093/nike-just-do-it.png"
            alt=""
          />
        </Link>
        <div className="text-center mt-4 flex flex-col gap-6 items-center">
          <h1 className="text-6xl font-extrabold">THIS SEASON'S FRESH GEARS</h1>
          <p className="text-xl">
            Step into the new year with a wardrobe refresh that brings out your
            best personal style. Shop our Lunar New Year collection.
          </p>
          <Link
            to={"/products"}
            className="px-8 py-2 bg-primary text-text rounded-2xl mt-2 hover:bg-mainBg"
          >
            Shop
          </Link>
        </div>
        <div className="mt-8 w-full text-left flex gap-2 items-center">
          <h2 className="text-2xl">Trending sneakers</h2>
          <FaArrowRightLong className="translate-y-0.5" />
        </div>
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 &&
            products.slice(0, 4).map((product, i) => (
              <Link
                key={i}
                className="mb-8 rounded-2xl overflow-hidden relative shadow-md shadow-gray-300"
                to={`/products/${product._id}`}
              >
                <div className="flex w-full h-full bg-gray-300">
                  <img
                    className="object-cover grow hover:scale-125 transition-all"
                    src={`https://shoepedia-ecom.onrender.com/uploads/${product.images[0]}`}
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col justify-between gap-2 px-4 py-2 text-mainBg absolute bottom-2 left-2">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <h3 className="uppercase">{product.brand}</h3>
                </div>
                <div className="absolute top-7 left-7 ">
                  <div className="px-4 py-1 bg-mainBg text-text text-center rounded-xl">
                    Shop
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="mt-8 grid gap-x-6 grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] rounded-xl overflow-hidden">
          <div className="flex w-full h-full relative text-white">
            <img
              className="object-cover grow"
              src="https://images.unsplash.com/photo-1609522134706-2de3908013c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <h1 className="text-[3rem] font-bold absolute bottom-[5%] left-[7%]">
              Classic enough to make you a<br />
              SUPERSTAR.
            </h1>
            <Link
              to={`/products/${superstarId}`}
              className="px-6 py-2 bg-text text-mainBg rounded-xl mt-2 absolute top-[7%] left-[7%]"
            >
              Shop
            </Link>
          </div>
          <div className="flex w-full h-full relative text-white">
            <img
              className="object-cover grow"
              src="https://images.unsplash.com/photo-1520472297347-d51f4503688d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <h1 className="text-[2.5rem] font-bold absolute bottom-[7%] left-[10%]">
              Trekking is fun with
              <br />
              TIMBERLANDS.
            </h1>
            <Link to={`/products/${timberlandId}`} className="px-6 py-2 bg-text text-mainBg rounded-xl mt-2 absolute top-[7%] left-[10%]">
              Shop
            </Link>
          </div>
        </div>
        <Link to={`/products/${predatorId}`} className="w-full mt-16 relative">
          <img
            className="w-full rounded-xl"
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enBE/Images/football-ss24-predator-strike-launch-pdp-story-tab-01-elite-ft-IG1707-final-d_tcm145-1084216.jpg"
            alt=""
          />
          <div className="px-6 py-2 bg-text text-mainBg rounded-2xl mt-2 absolute top-7 right-9">
            Explore
          </div>
        </Link>
        <div className="text-center mt-4 flex flex-col gap-4 items-center">
          <h1 className="text-6xl font-extrabold">FOOTBALL SEASON ARRIVES</h1>
          <p className="text-xl">
            PREDATOR FOOTBALL BOOTS FOR FIRM GROUND PLAY MADE WITH RECYCLED
            MATERIALS.
          </p>
        </div>
        <div className="w-full h-[20rem] lg:flex md:flex  sm:grid sm:grid-col-1 gap-6 mt-16">
          <div className="w-full h-full bg-no-repeat animate-slideshow1 rounded-2xl shadow-lg shadow-gray-500"></div>
          <div className="w-full h-full bg-no-repeat animate-slideshow2 rounded-2xl shadow-lg shadow-gray-500"></div>
          <div className="w-full h-full bg-no-repeat animate-slideshow3 rounded-2xl shadow-lg shadow-gray-500"></div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
