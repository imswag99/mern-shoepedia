import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
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
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="w-[85%] bg-text flex flex-col items-center justify-center">
        {subpage === "account" && (
          <div className="w-[30%]">
            <h3 className="text-adminPrimary text-2xl font-semibold mb-3 text-center">
              Logged in
            </h3>
            <form
              onSubmit={updateProfile}
              className="w-full text-adminPrimary mx-auto mt-8 grow"
            >
              <div className="flex gap-2 items-center">
                <label>
                  <FaUser />
                </label>
                <input
                  className="admin"
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
                  className="admin"
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
                  className="admin"
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
                  className="admin"
                  type="password"
                  placeholder="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="adminprimary mt-6 mb-3">Save</button>
            </form>
            <button onClick={logout} className="adminprimary">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
