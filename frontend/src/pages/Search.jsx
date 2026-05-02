import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductCard from "../components/product/ProductCard";
import Filters from "../components/product/Filters";
import Loader from "../components/layout/Loader";
import MetaData from "../components/layout/MetaData";
import toast from "react-hot-toast";
import ReactPaginatePkg from "react-paginate";

const ReactPaginate = ReactPaginatePkg.default || ReactPaginatePkg;

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("price[gte]") || "";
  const max = searchParams.get("price[lte]") || "";
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, min, max]);

  const { data, isLoading, error, isError } = useGetProductsQuery({
    keyword,
    page: currentPage,
    min,
    max,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [isError, error]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      <MetaData title={keyword ? `Results for "${keyword}"` : "All Products"} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        {/* ─── Page Header ─── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            {keyword ? (
              <>
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-1">Search Results</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Results for <span className="text-orange-400">"{keyword}"</span>
                </h1>
              </>
            ) : (
              <>
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mb-1">Catalog</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">All Products</h1>
              </>
            )}
            {!isLoading && (
              <p className="text-gray-400 text-sm mt-2">
                {data?.filteredProductsCount ?? 0} product{data?.filteredProductsCount !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {(keyword || min || max) && (
            <Link
              to="/search"
              className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-200 underline underline-offset-4 whitespace-nowrap"
            >
              Clear all filters
            </Link>
          )}
        </div>

        {/* ─── Two-Column Layout: Filters + Products ─── */}
        <div className="flex gap-6 items-start">

          {/* Filters Sidebar */}
          <div className="w-64 shrink-0 hidden md:block">
            <Filters />
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <Loader />
            ) : products.length > 0 ? (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  {data?.filteredProductsCount > data?.resPerPage && (
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={Math.ceil(data?.filteredProductsCount / data?.resPerPage)}
                      previousLabel="Prev"
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      activeClassName="active"
                      forcePage={currentPage - 1}
                    />
                  )}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="text-7xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold text-white mb-3">No products found</h2>
                <p className="text-gray-400 max-w-sm mb-6">
                  {keyword
                    ? `We couldn't find anything matching "${keyword}". Try adjusting your filters.`
                    : "No products match the selected filters."}
                </p>
                <Link
                  to="/search"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters — shown below header on small screens */}
        <div className="md:hidden mt-6">
          <details className="bg-gray-900 border border-white/10 rounded-2xl">
            <summary className="px-5 py-4 text-white font-semibold text-sm cursor-pointer list-none flex items-center justify-between">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filter by Price
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5">
              <Filters />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
