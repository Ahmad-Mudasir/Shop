import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/queryHelper";

const Filters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read current min/max from URL on mount
  const [min, setMin] = useState(searchParams.get("price[gte]") || "");
  const [max, setMax] = useState(searchParams.get("price[lte]") || "");

  const handlePriceFilter = (e) => {
    e.preventDefault();

    // Validate
    if (min !== "" && max !== "" && Number(min) > Number(max)) {
      return; // invalid range — could also show toast
    }

    const updatedParams = getPriceQueryParams(searchParams, min, max);
    // Always reset to page 1 when filter changes
    updatedParams.delete("page");
    navigate(`/search?${updatedParams.toString()}`);
  };

  const handleClearPrice = () => {
    setMin("");
    setMax("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("price[gte]");
    params.delete("price[lte]");
    params.delete("page");
    navigate(`/search?${params.toString()}`);
  };

  const isPriceFilterActive =
    searchParams.get("price[gte]") || searchParams.get("price[lte]");

  return (
    <aside className="w-full">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-base flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filters
          </h2>
          {isPriceFilterActive && (
            <button
              onClick={handleClearPrice}
              className="text-xs text-orange-400 hover:text-orange-300 transition-colors duration-200 cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-5" />

        {/* Price Range */}
        <form onSubmit={handlePriceFilter}>
          <p className="text-gray-300 text-sm font-semibold mb-4">Price Range</p>

          {/* Min Input */}
          <div className="mb-3">
            <label className="text-gray-500 text-xs mb-1 block">Min Price ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                id="min_price"
                min="0"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="0"
                className="w-full bg-white/5 text-white placeholder-gray-600 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-sm outline-none focus:border-orange-400/60 focus:bg-white/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Max Input */}
          <div className="mb-4">
            <label className="text-gray-500 text-xs mb-1 block">Max Price ($)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                id="max_price"
                min="0"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="10000"
                className="w-full bg-white/5 text-white placeholder-gray-600 border border-white/10 rounded-lg pl-7 pr-3 py-2 text-sm outline-none focus:border-orange-400/60 focus:bg-white/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Validation error */}
          {min !== "" && max !== "" && Number(min) > Number(max) && (
            <p className="text-red-400 text-xs mb-3">Min price cannot exceed max price.</p>
          )}

          {/* Apply button */}
          <button
            type="submit"
            id="apply_price_filter"
            className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-orange-500/20 cursor-pointer"
          >
            Apply Filter
          </button>
        </form>

        {/* Active filter badge */}
        {isPriceFilterActive && (
          <div className="mt-4 flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
            <span className="text-orange-400 text-xs font-medium">
              Active: ${searchParams.get("price[gte]") || "0"} – ${searchParams.get("price[lte]") || "∞"}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Filters;
