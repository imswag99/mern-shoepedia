import React, { useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", {email, password });

      setUser(data);
      setAdmin(data.isAdmin);
      alert("Login SUCCESSFUL");
      setRedirect(true);
    } catch (error) {
      alert("Login FAILED");
    }
  };

  if (!admin && redirect) {
    return <Navigate to={"/"} />;
  }

  if (admin && redirect) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <div className="w-full bg-mainBg flex items-center justify-center">
      <div className="px-4 py-8 w-[40%] grid items-center text-text">
        <h1 className="text-center mb-8 text-4xl underline">Sign in/Login</h1>
        <form className="w-full mx-auto grow" onSubmit={handleUserLogin}>
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
          <button className="primary mt-6 mb-3">Login</button>
        </form>

        <h3 className="text-sm text-center">
          Don't have an account yet?{" "}
          <Link className="underline" to={"/register"}>
            {" "}
            Register Now
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
