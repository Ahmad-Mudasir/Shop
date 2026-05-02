import React from "react";
import { Link } from "react-router-dom";
import NotFoundMeta from "../components/layout/metadata/NotFoundMeta";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <NotFoundMeta />
      <div className="text-center">
        <p className="text-orange-400 text-8xl font-extrabold tracking-tight mb-4">404</p>
        <h1 className="text-white text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-gray-400 text-base mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          id="back_home_btn"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
