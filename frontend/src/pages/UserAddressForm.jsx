import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";

const UserAddressForm = () => {
  const { user } = useContext(UserContext);

  const [house, setHouse] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (!user) return;

    axios.get("/user/get-address").then(({ data }) => {
      setHouse(data.house);
      setLocality(data.locality);
      setPincode(data.pincode);
      setCity(data.city);
      setState(data.state);
      setCountry(data.country);
    });
  }, [user]);

  const updateUserAddress = (e) => {
    e.preventDefault();
    const addressData = {
      house,
      locality,
      pincode,
      city,
      state,
      country,
    };

    const { data } = axios.put("/user/update-address", addressData);

    setHouse(data.house);
    setLocality(data.locality);
    setPincode(data.pincode);
    setCity(data.city);
    setState(data.state);
    setCountry(data.country);
  };

  return (
    <>
      <div className="w-[4%]"></div>
      <div className="w-[96%] bg-mainBg text-text p-8 flex flex-col gap-8">
        <div>
          <h1 className="uppercase text-2xl">
            Update your delivery address
          </h1>
        </div>
        <form onSubmit={updateUserAddress} className="flex flex-col gap-8">
          <div className="flex gap-8">
            <input
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              type="text"
              placeholder="house name/no."
              required
            />
            <input
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              type="text"
              placeholder="locality"
              required
            />
          </div>
          <div className="flex gap-8">
            <input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              type="text"
              placeholder="pincode"
              required
            />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="city"
              required
            />
          </div>
          <div className="flex gap-8">
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              type="text"
              placeholder="state"
              required
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="country"
              required
            />
          </div>
          <div className="w-full flex justify-center">
            <Link to={"/payments"} className="w-[40%] text-center bg-text text-mainBg font-semibold py-3 rounded-md">
              PAYMENT
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserAddressForm;
