import React, { useEffect, useState } from "react";

const FilterSection = ({ products, onChange }) => {
  let temp1 = [];
  let temp2 = [];
  let temp3 = [];
  let max = products.reduce(
    (acc, product) => (acc = acc > product.price ? acc : product.price),
    0
  );
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [shoePrice, setShoePrice] = useState(max);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    products.map((product) => {
      temp1.push(product.gender);
      temp2.push(product.category);
      temp3.push(product.brand);
    });
    setGenders([...new Set(temp1)]);
    setCategories([...new Set(temp2)]);
    setBrands([...new Set(temp3)]);
    setShoePrice(max);
  }, [products]);

  const handleGender = (e) => {
    const { name } = e.target;
    let clickedGender = name;
    setClicked(clickedGender);

    onChange(products.filter((product) => product.gender === name));
  };

  const handleCategory = (e) => {
    const { name } = e.target;
    let clickedCategory = name;
    setClicked(clickedCategory);

    onChange(products.filter((product) => product.category === name));
  };

  const handleBrand = (e) => {
    const { name } = e.target;
    let clickedBrand = name;
    setClicked(clickedBrand);

    onChange(products.filter((product) => product.brand === name));
  };

  const handlePrice = (e) => {
    const { value } = e.target;
    let priceRange = value;
    setShoePrice(priceRange);

    onChange(
      products.filter(
        (product) => product.price > 0 && product.price <= priceRange
      )
    );
  };

  const clearFilters = () => {
    onChange(products);
    setClicked(false);
    setShoePrice(max);
  };

  return (
    <div className="w-[15%] bg-text text-primary rounded-2xl flex flex-col gap-6">
      <div className="flex flex-col gap-2 p-3  rounded-xl">
        <h1 className="text-lg font-bold uppercase underline-offset-2">
          Genders
        </h1>
        {genders.length > 0 &&
          genders.map((gender, i) => (
            <button
              key={i}
              onClick={handleGender}
              className={`px-3 py-1 flex rounded-2xl capitalize ${
                clicked === gender
                  ? "bg-primary text-text"
                  : "bg-transparent text-primary"
              }`}
              name={gender}
            >
              {gender}
            </button>
          ))}
      </div>
      <div className="flex flex-col gap-2 p-3 rounded-xl">
        <h1 className="text-lg font-bold uppercase underline-offset-2">
          Categories
        </h1>
        {categories.length > 0 &&
          categories.map((category, i) => (
            <button
              key={i}
              onClick={handleCategory}
              className={`px-3 py-1 flex rounded-2xl capitalize ${
                clicked === category
                  ? "bg-primary text-text"
                  : "bg-transparent text-primary"
              }`}
              name={category}
            >
              {category}
            </button>
          ))}
      </div>
      <div className="flex flex-col gap-2 p-3 rounded-xl">
        <h1 className="text-lg font-bold uppercase underline-offset-2">
          Brands
        </h1>
        {brands.length > 0 &&
          brands.map((brand, i) => (
            <button
              key={i}
              onClick={handleBrand}
              className={`px-3 py-1 flex rounded-2xl capitalize ${
                clicked === brand
                  ? "bg-primary text-text"
                  : "bg-transparent text-primary"
              }`}
              name={brand}
            >
              {brand}
            </button>
          ))}
      </div>
      <div className="flex flex-col gap-2 p-3 rounded-xl">
        <h1 className="text-lg font-bold uppercase underline-offset-2">
          Price
        </h1>
        <input
          title={shoePrice}
          type="range"
          min="0"
          max={max}
          onChange={handlePrice}
          value={shoePrice}
        />
      </div>
      <div className="mb-5 flex justify-center">
        <button
          onClick={clearFilters}
          className="px-4 py-1 rounded-xl text-text bg-primary"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
