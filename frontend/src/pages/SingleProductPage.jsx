import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import Star from "../components/Star";

const SingleProductPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { wishlisted, setWishlisted, cart, setCart, isAddedToCart, setIsAddedToCart } = useContext(ProductContext);

  const rated =
    "border border-mainBg p-2 w-full uppercase font-semibold rounded-xl bg-transparent";
  const unrated =
    "border border-mainBg p-2 w-full uppercase font-semibold rounded-xl bg-mainBg text-text";

  const ratings = [1, 2, 3, 4, 5];
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [addToWishlist, setAddToWishlist] = useState([]);
  const [allRatings, setAllRatings] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    let allRate = [];
    axios.get(`/product/${id}`).then(({ data }) => {
      setProduct(data);
      setCurrentImage(data.images[0]);

      data.ratings.map((rating) => allRate.push(rating.rating));
      setAllRatings(allRate);
    });

    const wishlistedProd = localStorage.getItem("addToWishlist");
    if (!wishlistedProd) return;
    setAddToWishlist(JSON.parse(wishlistedProd));

    const wishlist = localStorage.getItem("wishlisted");
    if (!wishlist) return;
    setWishlisted(JSON.parse(wishlist));

    const cartProdId = localStorage.getItem("addToCart");
    if (!cartProdId) return;
    setIsAddedToCart(JSON.parse(cartProdId));

    const cartItems = localStorage.getItem("cart");
    if (!cartItems) return;
    setCart(JSON.parse(cartItems));
  }, [id]);

  if (!product) return "";

  const changeImg = (image) => {
    setCurrentImage(image);
  };

  const handleRating = (e, index) => {
    e.preventDefault();
    setRating(index);
  };

  const submitReviews = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to login to submit reviews");
      setRedirect(true);
    } else {
      const reviewData = { rating, review };
      await axios.put(`/product/${id}`, reviewData);

      alert("Thank you for your feedback");
      setRating(0);
      setReview("");
    }
  };

  const handleWishlistAdd = () => {
    const updatedAddToWishList = [...addToWishlist, id];
    const updatedWishlisted = [...wishlisted, product];

    setAddToWishlist(updatedAddToWishList); // Messed up here again
    setWishlisted(updatedWishlisted); // setState is ASYNC

    localStorage.setItem("addToWishlist", JSON.stringify(updatedAddToWishList));
    localStorage.setItem("wishlisted", JSON.stringify(updatedWishlisted));
  };

  const handleWishlistRemove = () => {
    const updatedAddToWishList = addToWishlist.filter(
      (pid) => pid !== id
    );
    const wishlistedProd = wishlisted.filter(
      (prod) => prod._id !== id
    );

    setAddToWishlist(updatedAddToWishList);
    setWishlisted(wishlistedProd);

    localStorage.setItem("addToWishlist", JSON.stringify(updatedAddToWishList));
    localStorage.setItem("wishlisted", JSON.stringify(wishlistedProd));
  };

  const addToCart = (e) => {
    e.preventDefault();
    if(!user) {
      setRedirect(true);
      return;
    }

    if(isAddedToCart.includes(id)){
      alert('Item already in cart');
      return;
    }

    const cartItem = { product, size, quantity }
    const updatedCart = [...cart, cartItem];
    const updatedIsAddedToCart = [...isAddedToCart, id];

    setCart(updatedCart);
    setIsAddedToCart(updatedIsAddedToCart);

    localStorage.setItem("addToCart", JSON.stringify(updatedIsAddedToCart));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg text-text p-8 flex flex-col gap-8">
        <div>
          <h3>
            <Link
              className="hover:text-green-300 underline underline-offset-2"
              to={"/"}
            >
              Home
            </Link>{" "}
            /{" "}
            <Link
              className="hover:text-green-300 underline underline-offset-2"
              to={"/products"}
            >
              Products
            </Link>{" "}
            / {product.title}
          </h3>
        </div>
        <div className="flex justify-center gap-8">
          <div className="w-[50%] flex items-center gap-6 justify-center">
            <div className="flex flex-col gap-4">
              {product.images.length > 0 &&
                product.images.map((image, i) => (
                  <img
                    key={i}
                    onClick={() => changeImg(image)}
                    className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                    src={`http://localhost:5000/uploads/${image}`}
                    alt=""
                  />
                ))}
            </div>
            <div className="relative">
              {product.images.length > 0 && (
                <img
                  className="w-[34rem] h-[34rem] object-cover rounded-xl"
                  src={`http://localhost:5000/uploads/${currentImage}`}
                  alt=""
                />
              )}
              {!addToWishlist.includes(id) && (
                <button
                  onClick={handleWishlistAdd}
                  title="Add to wishlist"
                  className="bg-transparent absolute top-5 right-5 text-black"
                >
                  <FaRegHeart size={30} />
                </button>
              )}
              {addToWishlist.includes(id) && (
                <button
                  onClick={handleWishlistRemove}
                  title="Remove from wishlist"
                  className="bg-transparent absolute top-5 right-5 text-black"
                >
                  <FaHeart size={30} />
                </button>
              )}
            </div>
          </div>
          <div className="w-[50%] flex flex-col justify-between">
            <div>
              <div className="w-full flex gap-6 justify-between items-center">
                <h1 className="text-3xl">
                  {product.brand} {product.title}
                </h1>
                <Star allRatings={allRatings} product={product} />
              </div>
              <h2 className="capitalize">
                {product.gender} {product.category}
              </h2>
            </div>
            <div className="flex gap-3 items-center">
              <IoPricetagOutline size={30} />
              <h2 className="text-3xl font-extrabold">${product.price}</h2>
            </div>
            <div className="mb-10">
              <h1 className="text-2xl mb-2">Description</h1>
              <p className="text-justify">{product.description}</p>
            </div>
            <div className="flex gap-4 justify-between -mt-8">
              <div className="flex gap-1 items-center">
                <TbTruckDelivery size={30} />
                <h2>Free Delivery</h2>
              </div>

              <div className="flex gap-1 items-center">
                <TbTruckReturn size={30} />
                <h2>30-day return policy</h2>
              </div>

              <div className="flex gap-1 items-center">
                <RiRefund2Line size={30} />
                <h2>Easy and quick refunds</h2>
              </div>
            </div>
            <form>
              <div className="flex gap-4 mb-6">
                <select value={size} onChange={(e) => setSize(e.target.value)} required>
                  <option>size</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                <input
                  type="number"
                  placeholder="quantity"
                  min={1}
                  value={
                    quantity >= product.stock
                      ? product.stock
                      : quantity && quantity < 0
                      ? 0
                      : quantity
                  }
                  max={product.stock}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button onClick={addToCart} className="cart">ADD TO CART</button>
            </form>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-10">
          <form
            onSubmit={submitReviews}
            className="w-[40%] flex flex-col gap-4 justify-between text-mainBg bg-text p-6 rounded-xl"
          >
            <div>
              <h1 className="text-lg mb-2">Rate this product</h1>
              <div className="flex gap-[5rem]">
                {ratings.map((rate, i) => {
                  i += 1;
                  return (
                    <button
                      key={i}
                      className={i <= rating ? unrated : rated}
                      onClick={(e) => handleRating(e, i)}
                      value={i}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-lg mb-2">Write a review</h1>
              <textarea
                className="border-mainBg text-mainBg"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button className="w-full bg-mainBg py-2 text-text uppercase rounded-xl">
              Submit review
            </button>
          </form>
          <div className="w-[30%]">
            <h1 className="text-2xl mb-2">Product Details</h1>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col justify-between">
                {product.details.split("\n").map((line, index) => (
                  <p className="mt-2" key={index}>
                    {line.trim() === "" ? "\u00A0" : "\u2022 " + line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[30%]">
            {product.reviews.length > 0 && (
              <>
                <h1 className="text-2xl mb-4">Reviews</h1>
                <div className="h-[20%] bg-text text-mainBg overflow-auto flex flex-col gap-4 justify-between px-6 py-3 rounded-xl">
                  {product.reviews.map((review, i) => (
                    <div key={i} className="flex flex-col justify-between">
                      <div className="flex gap-2 items-center">
                        <TiUser />
                        <h1>{review.user.name}</h1>
                      </div>
                      <div className="flex gap-2 items-center">
                        <MdModeComment />
                        <p>{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
