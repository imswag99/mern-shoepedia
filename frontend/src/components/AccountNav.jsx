import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiUser, FiPackage } from "react-icons/fi";

const AccountNav = () => {

  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if(subpage === undefined){
    subpage = 'profile';
  }

  const linkClasses = (type=null) => {
    let classes = "inline-flex gap-1 items-center py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full scale-90";
    }else{
      classes += " bg-text text-primary rounded-full";
    }
    return classes;
  }

  return (
    <nav className='w-full text-text flex justify-center gap-6 mt-16 mb-8'>
      <Link to={"/account"} className={linkClasses("profile")}>
        <FiUser />
        Profile
      </Link>
      <Link to={"/account/myorders"} className={linkClasses("myorders")}>
        <FiPackage />
        Orders
      </Link>
    </nav>
  )
}

export default AccountNav