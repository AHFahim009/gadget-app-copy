import app from "./app";
import { config } from "./config";
import mongoose from "mongoose";

const main = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.DB_URL as string, {
            dbName: "gadget_e_commerce_2024",
        });

        console.log("\n Connected to MongoDB");

        // Server start
        app.listen(config.PORT, () => {
            console.log(`\n Server is running on port ${config.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

main();
