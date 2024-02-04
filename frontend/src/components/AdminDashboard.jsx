import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiUser, FiPackage } from "react-icons/fi";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div
      className="w-[15%] bg-adminPrimary text-text h-screen flex flex-col justify-between items-center p-4 fixed"
    >
      <div className="flex flex-col gap-10 items-center">
        <div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/admin/dashboard"}>
              <h1 className="font-bold mt-4 bg-text text-adminPrimary px-4 py-2 rounded-lg">DASHBOARD</h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/admin/products"}>
              <IoBagHandleOutline size={20} />
              <span className="lg:block md:block sm:hidden">Products</span>
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/admin/users"}>
              <FiUser size={20} />
              <span className="lg:block md:block sm:hidden">Customers</span>
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Link className="flex gap-1 items-center" to={"/admin/orders"}>
              <FiPackage size={20} />
              <span className="lg:block md:block sm:hidden">Orders</span>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <Link
            to={user ? "/admin/account" : "/login"}
            className="flex gap-1 items-center"
          >
            <FaRegUser size={25} />
            {!!user && (
              <span className="lg:block md:block sm:hidden">{user.name}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
