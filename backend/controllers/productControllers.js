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