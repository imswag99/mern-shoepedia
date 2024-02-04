import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ProfilePage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("/user/profile").then((response) => {
      setUser(response.data);
      setNewName(response.data.name);
    });
  }, []);

  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const { data } = await axios.put("/user/update-profile", {
        newName,
        password,
        confirmPassword,
      });

      setUser(data);
      setNewName(data.name);
      setRedirect(true);
    } else {
      alert("Passwords don't match...");
    }
  };

  const logout = async () => {
    await axios.post("/user/logout");
    setRedirect(true);
    setUser(null);
  };

  if (!ready) {
    return "...Loading";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full bg-mainBg flex flex-col items-center">
      <AccountNav />
      {subpage === "profile" && (
        <div className="w-[30%]">
          <h3 className="text-text text-2xl font-semibold mb-3 text-center">
            Logged in
          </h3>
          <form
            onSubmit={updateProfile}
            className="w-full text-text mx-auto mt-8 grow"
          >
            <div className="flex gap-2 items-center">
              <label>
                <FaUser />
              </label>
              <input
                className="text-text"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>
                <MdEmail />
              </label>
              <input
                className="text-text"
                type="text"
                value={user.email}
                readOnly
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>
                <FaLock />
              </label>
              <input
                className="text-text"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>
                <FaUnlock />
              </label>
              <input
                className="text-text"
                type="password"
                placeholder="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="primary mt-6 mb-3">Save</button>
          </form>
          <button onClick={logout} className="primary">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
