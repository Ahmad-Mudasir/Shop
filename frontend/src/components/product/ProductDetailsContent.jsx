import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const ProductDetailsContent = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    if (quantity < product?.stock) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <span className="bg-orange-500/10 text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">
          {product?.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
          {product?.name}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Product # {product?._id}</p>
      </div>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
        <div className="flex items-center gap-1">
          <Rating
            initialValue={product?.ratings}
            readonly={true}
            size={20}
            fillColor="#fbbf24"
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
          />
          <span className="text-gray-400 text-sm ml-1">({product?.numOfReviews} Reviews)</span>
        </div>
        <div className={`text-sm font-semibold ${product?.stock > 0 ? "text-green-400" : "text-red-400"}`}>
          {product?.stock > 0 ? "● In Stock" : "● Out of Stock"}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">${product?.price?.toFixed(2)}</h2>
        <p className="text-gray-400 leading-relaxed max-w-xl mt-4">
          {product?.description}
        </p>
      </div>

      <div className="space-y-6">
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quantity</span>
          <div className="flex items-center bg-gray-900/50 border border-white/10 rounded-xl p-1">
            <button
              onClick={decreaseQty}
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/5 rounded-lg transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center font-bold text-white">{quantity}</span>
            <button
              onClick={increaseQty}
              className="w-10 h-10 flex items-center justify-center text-xl hover:bg-white/5 rounded-lg transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            disabled={product?.stock <= 0}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-xl shadow-orange-500/20"
          >
            Add to Cart
          </button>
          <button className="flex-1 bg-white/5 hover:bg-white/10 active:scale-[0.98] text-white font-bold py-4 px-8 rounded-2xl border border-white/10 transition-all duration-200">
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">👤</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Sold by</p>
            <p className="text-white font-bold">{product?.seller}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContent;
