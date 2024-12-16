import { v2 as cloudinary } from "cloudinary";
import http from "http";
import connectDB from "./utils/db";
import { initSocketServer } from "./socketServer";
import { app } from "./app";
import cluster from "cluster";
import os from "os";
require("dotenv").config();

// Add global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Log the error but keep the process running
});

// Add handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Log the error but keep the process running
});

if (cluster.isPrimary) {
    // Get the number of available CPU cores
    const numCPUs = os.cpus().length;

    // Fork workers for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Enhanced worker crash handling
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        console.log('Starting a new worker...');
        cluster.fork();
    });

} else {
    // Worker process
    const server = http.createServer(app);

    // Wrap server initialization in try-catch
    try {
        // cloudinary config
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_SECRET_KEY,
        });

        initSocketServer(server);

        // Add error handler for the server
        server.on('error', (error) => {
            console.error('Server error:', error);
            // Attempt to recover or restart the server
        });

        // create server
        server.listen(process.env.PORT, () => {
            console.log(`Worker ${process.pid} started - Server is connected with port ${process.env.PORT}`);
            // Wrap database connection in try-catch
            connectDB().catch(err => {
                console.error('Database connection error:', err);
                // Server will continue running even if DB connection fails
            });
        });
    } catch (error) {
        console.error('Server initialization error:', error);
        // Attempt to restart the worker
        process.exit(1); // Cluster will start a new worker
    }
}