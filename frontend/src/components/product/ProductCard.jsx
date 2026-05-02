import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, price, ratings, numOfReviews, images, category } = product;

  return (
    <div className="group relative bg-gray-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-orange-500/90 backdrop-blur text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Image */}
      <Link to={`/product/${_id}`} className="block overflow-hidden h-52 bg-gray-900/50">
        <img
          src={images?.[0]?.url || "https://placehold.co/400x300/1f2937/9ca3af?text=No+Image"}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${_id}`}>
          <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 hover:text-orange-400 transition-colors duration-200 mb-2">
            {name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center gap-2 mb-3">
          <Rating
            initialValue={ratings}
            readonly={true}
            size={20}
            fillColor="#fbbf24"
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
          />
          <span className="text-xs text-gray-400">({numOfReviews} reviews)</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-white font-bold text-lg">
            ${price?.toFixed(2)}
          </span>
          <Link
            to={`/product/${_id}`}
            id={`view_product_${_id}`}
            className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
