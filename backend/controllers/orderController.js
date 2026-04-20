import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
//Create new order => /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderItems, shippingInfo, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo, paidAt } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt,
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
    })
});

//get current logged in user orders => /api/v1/orders/me
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).populate("user", "name email");
    res.status(200).json({
        success: true,
        orders,
    });
});

//get single order => /api/v1/order/:id
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

//admin get all orders => /api/v1/admin/orders
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({
        success: true,
        orders,
    });
});

//admin update order => /api/v1/admin/order/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order already delivered", 400));
    }

    //update product stock
    for (const item of order.orderItems) {
        const product = await Product.findById(item?.product?.toString());
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        product.stock -= item.quantity;
        await product.save({ validateBeforeSave: false });
    }
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order,
    });
});

//admin delete order => /api/v1/admin/order/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    await order.deleteOne();
    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
});