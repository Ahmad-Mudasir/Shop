import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
//get all products
export const getproducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;

    const apiFilters = new APIFilters(Product, req.query).search().filter();

    let products = await apiFilters.query;
    let filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        resPerPage,
        filteredProductsCount,
        products,
    })
});

//get single product
export const getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product,
    })
}

//Create new product => /api/v1/admin/product/new
export const newProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    })
});

//Update product => /api/v1/admin/product/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
    })
});

//Delete product => /api/v1/admin/product/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    })
});

//Create new review => /api/v1/review
export const createReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const isReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(201).json({
        success: true,
        message: "Review created successfully",
        review,
    })
});

//Get all reviews => /api/v1/reviews?id=6715829a941166731711a475
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        reviews: product.reviews,
    })
});

//Delete review => /api/v1/reviews?id=6715829a941166731711a475
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter((review) => review.user.toString() !== req.user._id.toString());
    product.reviews = reviews;
    product.numOfReviews = product.reviews.length;
    product.ratings = product.reviews.length > 0 ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    })
});