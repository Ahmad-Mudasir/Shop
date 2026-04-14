import mongoose from "mongoose";

export const connectDatabase = () => {
    let DB_URI = process.env.DB_LOCAL_URI;

    mongoose.connect(DB_URI).then((con) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    }).catch((err) => {
        console.log("Database Connection Error:", err);
    });
};
