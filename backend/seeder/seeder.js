import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/shop");
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Products seeded successfully");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedProducts();