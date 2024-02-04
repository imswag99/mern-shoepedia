import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminIndexPage = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get('/user').then(({data}) => {
      setUsers(data);
    })

    axios.get('/product').then(({data}) => {
      setProducts(data)
    })

    axios.get('/order').then(({data}) => {
      setOrders(data)
    })
  }, []);

  const totalUsers = () => {
    let count = 0;
    users.map((user) => count++);
    return count;
  }

  const totalProducts = () => {
    let count = 0;
    products.map((product) => count++);
    return count;
  }

  const totalOrders = () => {
    let count = 0;
    orders.map((order) => count++);
    return count;
  }

  const totalEarnings = () => {
    let amount = 0;
    orders.map((order) => amount += parseInt(order.amount));
    return amount;
  }

  return (
    <>
      <div className="w-[15%]"></div>
      <div className="w-[85%] bg-text p-8 text-adminPrimary">
        <div className='w-full flex gap-6 justify-between'>
          <div className='w-[25%] h-[10rem] bg-adminPrimary text-text rounded-lg shadow-md shadow-gray-400 p-4 relative'>
            <h1 className='text-md'>Customers</h1>
            <h1 className='text-5xl font-bold absolute top-[40%] left-[45%]'>{totalUsers()}</h1>
          </div>
          <div className='w-[25%] h-[10rem] bg-adminPrimary text-text rounded-lg shadow-md shadow-gray-400 p-4 relative'>
            <h1 className='text-md'>Products</h1>
            <h1 className='text-5xl font-bold absolute top-[40%] left-[45%]'>{totalProducts()}</h1>
          </div>
          <div className='w-[25%] h-[10rem] bg-adminPrimary text-text rounded-lg shadow-md shadow-gray-400 p-4 relative'>
            <h1 className='text-md'>Orders</h1>
            <h1 className='text-5xl font-bold absolute top-[40%] left-[45%]'>{totalOrders()}</h1>
          </div>
          <div className='w-[25%] h-[10rem] bg-adminPrimary text-text rounded-lg shadow-md shadow-gray-400 p-4 relative'>
            <h1 className='text-md'>Earnings</h1>
            <h1 className='text-5xl font-bold absolute top-[40%] left-[25%]'>${totalEarnings()}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminIndexPage