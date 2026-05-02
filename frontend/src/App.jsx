import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "search", element: <Search /> },
      // { path: "cart",             element: <Cart /> },
      // { path: "login",            element: <Login /> },
      // { path: "register",         element: <Register /> },
      // { path: "me/profile",       element: <Profile /> },
      // { path: "me/orders",        element: <MyOrders /> },
      // { path: "admin/dashboard",  element: <AdminDashboard /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
