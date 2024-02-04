import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [house, setHouse] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleUserRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", {
        name,
        email,
        password,
        house,
        locality,
        pincode,
        city,
        state,
        country
      });
      alert("Registration SUCCESSFUL");
      setRedirect(true);
    } catch (error) {
      alert("Registration FAILED");
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="w-full bg-mainBg flex items-center justify-center">
      <div className="px-4 py-8 w-[40%] grid items-center text-text">
        <h1 className="text-center mb-8 text-4xl underline">
          Sign up/Register
        </h1>
        <form className="w-full mx-auto grow" onSubmit={handleUserRegister}>
          <div className="flex gap-2 items-center">
            <label>
              <FaUser />
            </label>
            <input
              className="text-black"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label>
              <MdEmail />
            </label>
            <input
              className="text-black"
              type="text"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 items-center">
            <label>
              <FaLock />
            </label>
            <input
              className="text-black"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="flex gap-3 my-2 items-center">
              <FaAddressBook />
              <h1>Address</h1>
            </label>
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
          </div>
          <button className="primary mt-6 mb-3">Sign up</button>
        </form>

        <h3 className="text-sm text-center">
          Already registered?{" "}
          <Link className="underline" to={"/login"}>
            {" "}
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default RegisterPage;
