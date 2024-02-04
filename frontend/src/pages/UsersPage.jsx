import axios from "axios";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/user").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  const evenOrOdd = (index) => {
    let classname = "bg-adminPrimary text-text";
    if (index % 2 == 0) {
      classname = "bg-primary text-text";
    }
    return classname;
  };

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="w-[85%] bg-text p-8 text-adminPrimary">
        <h1 className="text-4xl">Customers</h1>
        <table className="w-full mt-8 rounded-xl overflow-hidden">
          <thead>
            <tr className="w-full bg-adminPrimary text-text">
              <td className="text-md font-bold text-left pl-8 py-4">
                CUSTOMER ID
              </td>
              <td className="text-md font-bold py-4">NAME</td>
              <td className="text-md font-bold py-4">EMAIL</td>
              <td className="text-md font-bold text-right pr-8 py-4">
                ADDRESS
              </td>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, i) => (
                <tr key={i} className={evenOrOdd(i)}>
                  <td className="py-3 text-left pl-8">{user._id}</td>
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3 text-right pr-8">
                    {user.address.house +
                      ", " +
                      user.address.locality +
                      ", " +
                      user.address.pincode +
                      ", " +
                      user.address.city +
                      ", " +
                      user.address.state +
                      ", " +
                      user.address.country}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;
