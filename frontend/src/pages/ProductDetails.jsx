import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../redux/api/productsApi";
import Loader from "../components/layout/Loader";
import toast from "react-hot-toast";
import MetaData from "../components/layout/MetaData";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductDetailsContent from "../components/product/ProductDetailsContent";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);

  const product = data?.product;

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load product details");
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  if (!product) return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      <MetaData title={product?.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <ProductImageGallery images={product?.images} name={product?.name} />

          <ProductDetailsContent product={product} />

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
