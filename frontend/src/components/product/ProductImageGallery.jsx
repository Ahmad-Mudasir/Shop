import React, { useState, useEffect } from "react";

const ProductImageGallery = ({ images, name }) => {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (images?.length > 0) {
      setActiveImage(images[0]?.url);
    }
  }, [images]);

  return (
    <div className="space-y-6">
      <div className="relative aspect-square bg-gray-900/50 rounded-3xl border border-white/10 p-8 flex items-center justify-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />
        <img
          src={activeImage || images?.[0]?.url || "https://placehold.co/600x600/1f2937/9ca3af?text=No+Image"}
          alt={name}
          className="max-w-full max-h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Thumbnails */}
      {images?.length > 1 && (
        <div className="flex flex-wrap gap-4">
          {images?.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img.url)}
              className={`w-20 h-20 rounded-xl border-2 transition-all duration-200 overflow-hidden bg-gray-900/50 p-2 ${
                activeImage === img.url ? "border-orange-500 shadow-lg shadow-orange-500/20" : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={img.url} alt={`Thumbnail ${i}`} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
