import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminPage from "./pages/AdminPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminProductsPage from "./pages/AdminProductsPage";
import ProductForm from "./pages/ProductForm";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import { ProductContextProvider } from "./context/ProductContext";
import SingleProductPage from "./pages/SingleProductPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import UserAddressForm from "./pages/UserAddressForm";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentsPage from "./pages/PaymentsPage";
import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminIndexPage from "./pages/AdminIndexPage";

axios.defaults.baseURL = "https://shoepedia-ecom.onrender.com/api";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <PayPalScriptProvider options={{ clientId: "AQ0k2ysPCgDesvMROXEVDIctmypOXE0dd0eoH7GXr4mxNq5ufm4l9yCeNJrTcqttdYC746kbf5XF7olm" }}>
      <UserContextProvider>
        <ProductContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/myorders" element={<MyOrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<SingleProductPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/address" element={<UserAddressForm />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/confirm/:id" element={<ConfirmOrderPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />}>
              <Route path="/admin/dashboard" element={<AdminIndexPage />} />
              <Route path="/admin/account" element={<AdminProfilePage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/:id" element={<ProductForm />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
            </Route>
          </Routes>
        </ProductContextProvider>
      </UserContextProvider>
    </PayPalScriptProvider>
  );
};

export default App;

