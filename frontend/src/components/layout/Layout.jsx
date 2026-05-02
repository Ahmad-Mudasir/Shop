import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <HelmetProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      <div className="min-h-screen flex flex-col bg-gray-950">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Layout;
