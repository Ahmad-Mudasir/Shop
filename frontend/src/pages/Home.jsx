import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import HomeMeta from "../components/layout/metadata/HomeMeta";
import Loader from "../components/layout/Loader";
import { useGetProductsQuery } from "../redux/api/productsApi";

const HERO_STATS = [
  { label: "Products", value: "10K+", icon: "📦" },
  { label: "Happy Customers", value: "50K+", icon: "😊" },
  { label: "Brands", value: "500+", icon: "🏷️" },
  { label: "Delivery Cities", value: "100+", icon: "🚚" },
];

const Home = () => {
  // Fetch latest products for the featured section (no keyword, page 1)
  const { data, isLoading } = useGetProductsQuery({ page: 1 });
  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HomeMeta />

      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-950 to-gray-900 pt-12 pb-16 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              🛍️ New Arrivals — Up to 40% Off
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-5">
              Shop Smart,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                Live Better
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Discover thousands of premium products — from the latest tech gadgets to everyday essentials. Fast shipping, best prices, and 100% satisfaction guaranteed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/search"
                id="shop_now_btn"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30"
              >
                Shop Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/search"
                id="browse_products_btn"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-orange-400/60 hover:bg-white/5 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-4 gap-4 border-t border-white/10 pt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-white font-bold text-lg leading-tight">{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Featured Image Card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-orange-500/30 to-orange-600/10 blur-2xl" />
              <div className="relative w-full h-full bg-gray-800/60 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center p-8 backdrop-blur">
                <img
                  src="http://res.cloudinary.com/udemy-courses/image/upload/v1698577543/shopit/demo/yxbrklp7snr7dgxfrxu9.jpg"
                  alt="Featured Product"
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-2xl px-4 py-2 shadow-xl shadow-orange-500/30 text-sm font-semibold">
                🔥 Best Seller
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest Products</h2>
            <p className="text-gray-500 text-sm mt-1">Freshly added to our catalog</p>
          </div>
          <Link
            to="/search"
            className="text-sm text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ─── PROMO BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="relative overflow-hidden bg-linear-to-r from-orange-600 to-orange-500 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/2 pointer-events-none" />
          <div className="relative">
            <p className="text-orange-100 text-sm font-medium mb-1">Limited Time Offer 🎉</p>
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">
              Get 20% off your first order!
            </h3>
            <p className="text-orange-100 text-sm mt-2">Use code <strong className="bg-white/20 px-2 py-0.5 rounded-md">SHOPIT20</strong> at checkout</p>
          </div>
          <Link
            to="/search"
            id="promo_cta_btn"
            className="relative shrink-0 bg-white text-orange-600 font-bold px-7 py-3 rounded-xl hover:bg-orange-50 active:scale-95 transition-all duration-200 shadow-xl"
          >
            Claim Offer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
