import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
        {/* Animated Ring */}
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Center Pulse */}
        <div className="absolute inset-4 bg-orange-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
