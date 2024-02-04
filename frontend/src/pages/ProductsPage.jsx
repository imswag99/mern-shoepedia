import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { ProductContext } from "../context/ProductContext";
import FilterSection from "../components/FilterSection";

const ProductsPage = () => {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const { products, filteredProducts, setFilteredProducts } =
    useContext(ProductContext);

  const gridClassName = "text-text bg-primary px-4";
  const defaultClassName = "text-mainBg bg-transparent";

  const changeSort = (e) => {
    let sortValue = e.target.value; // I was stuck here
    setSort(sortValue);

    switch (sortValue) {
      case "a-z":
        setFilteredProducts(
          filteredProducts.sort((a, b) => {
            const titleA = a.title.toUpperCase(); // ignore upper and lowercase
            const titleB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }

            // names must be equal
            return 0;
          })
        );
        break;
      case "z-a":
        setFilteredProducts(
          filteredProducts.sort((a, b) => {
            const titleA = a.title.toUpperCase(); // ignore upper and lowercase
            const titleB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titleA > titleB) {
              return -1;
            }
            if (titleA < titleB) {
              return 1;
            }

            // names must be equal
            return 0;
          })
        );
        break;

      case "ascending":
        setFilteredProducts(filteredProducts.sort((a, b) => a.price - b.price));
        break;

      case "descending":
        setFilteredProducts(filteredProducts.sort((a, b) => b.price - a.price));
        break;

      default:
        break;
    }
  };

  const prodSearch = (e) => {
    const searchText = e.target.value;

    if (searchText === "") {
      setSearch("");
      setFilteredProducts(products);
    } else {
      setSearch(searchText);
      setFilteredProducts(
        products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()) || product.brand.toLowerCase().includes(searchText.toLowerCase()))
      );
      console.log(filteredProducts);
    }
  };

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg flex gap-6 justify-center px-4 py-16">
        <FilterSection products={products} onChange={setFilteredProducts} />
        <div className="w-[80%] flex flex-col gap-4 items-center">
          <div className="w-full h-16 bg-text flex rounded-xl justify-between items-center px-8">
            <div className="flex h-full items-center gap-4">
              <select
                data-te-select-init
                className="h-[70%] w-[15rem] rounded-xl text-center"
                value={sort}
                onChange={changeSort}
              >
                <option>SORT</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
                <option value="ascending">price low to high</option>
                <option value="descending">price high to low</option>
              </select>
            </div>
            <div className="w-[70%] mx-10 text-mainBg px-4 flex items-center gap-2">
              <input
                className="search"
                type="text"
                placeholder="search"
                value={search}
                onChange={prodSearch}
              />
            </div>
            <div className="flex h-full gap-4">
              <button
                className={grid ? gridClassName : defaultClassName}
                onClick={() => setGrid(true)}
              >
                <IoGrid size={25} />
              </button>
              <button
                className={grid ? defaultClassName : gridClassName}
                onClick={() => setGrid(false)}
              >
                <FaThList size={25} />
              </button>
            </div>
          </div>
          {grid && (
            <div className="mt-8 grid gap-x-6 gap-y-32 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.length > 0 &&
                filteredProducts.map((product, i) => (
                  <Link
                    key={i}
                    className="mb-8 relative"
                    to={`/products/${product._id}`}
                  >
                    <div className="flex w-full h-[80%] bg-gray-300 overflow-hidden rounded-2xl shadow-md shadow-black">
                      <img
                        className="object-cover grow hover:scale-125 transition-all"
                        src={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt=""
                      />
                    </div>
                    <div className="w-full flex flex-col justify-between gap-2 px-4 py-2 text-text">
                      <h3 className="uppercase font-semibold">
                        {product.brand}
                      </h3>
                      <h3 className="text-lg">{product.title}</h3>
                      <h3 className="text-md capitalize">
                        {product.gender} {product.category}
                      </h3>
                      <h3 className="text-md font-light">${product.price}</h3>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          {!grid && (
            <div className="w-full mt-2">
              {filteredProducts.length > 0 &&
                filteredProducts.map((product, i) => (
                  <Link
                    key={i}
                    className="mb-8 flex cursor-pointer bg-primary rounded-2xl overflow-hidden relative"
                    to={`/products/${product._id}`}
                  >
                    <div className="flex w-32 bg-gray-300 shrink-0 overflow-hidden">
                      <img
                        className="object-cover grow hover:scale-125 transition-all"
                        src={`http://localhost:5000/uploads/${product.images[0]}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-2 px-4 py-2 text-text">
                      <h3 className="text-xl">
                        {product.brand} {product.title}
                      </h3>
                      <h3 className="text-md capitalize">
                        {product.gender} {product.category}
                      </h3>
                      <p className="line-clamp-1 overflow-hidden text-sm">
                        {product.description}
                      </p>
                      <h2 className="text-lg font-bold">${product.price}</h2>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
