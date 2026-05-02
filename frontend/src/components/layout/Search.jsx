import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword?.trim()) {
      navigate(`/search?keyword=${keyword.trim()}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full">
      <div className="relative w-full flex">
        <input
          type="text"
          id="search_field"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter Product Name ..."
          className="flex-1 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-l-lg px-4 py-2 text-sm outline-none focus:bg-white/20 focus:border-orange-400/60 transition-all duration-200"
        />
        <button
          id="search_btn"
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Search;
