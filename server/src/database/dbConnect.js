import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.retryCount = 0;

    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully!");
      this.isConnected = true;
    });

   mongoose.connection.on("error", (error) => {
     console.error("❌ MongoDB connection error:", error.message);
   });


    mongoose.connection.on("disconnected", () => {
      console.log("❌ MongoDB disconnected!");
      this.isConnected = false;
      // attempt reconnection
    });

    // process.on("SIGTERM");
  }

  async connect() {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MongoDB URI not provided in environment variables.");
      }

      const connectionOptions = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // use IPv4
      };

      if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true);
      }

      await mongoose.connect(process.env.MONGO_URI, connectionOptions);
      this.isConnected = true;
      this.retryCount = 0;
    } catch (error) {
      console.error("❌ MongoDB connection error:", error.message);
      this.isConnected = false;
      await this.handleConnectionError();
    }
  }

  async handleConnectionError() {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;
      console.log(
        `🔄 Retrying connection (${this.retryCount}/${MAX_RETRIES})...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return this.connect();
    } else {
      console.error("❌ Max retries reached. Exiting...");
      process.exit(1);
    }
  }

  async handleDisconnection() {
    if (!this.isConnected) {
      console.log("Attempting to reconnect to MongoDB");
      this.connect();
    }
  }

  async handleAppTermination() {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
      process.exit(0);
    } catch (error) {
      console.error("Error closing connection to MongoDB");
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
        isConnected: this.isConnected,
        retryCount: this.retryCount,
        readyState: mongoose.connection.readyState,
    }
  }
}

// create database instance
const dbConnection = new DatabaseConnection();

// export connection function and status getter
export default dbConnection.connect.bind(dbConnection);

export const getDbStatus = dbConnection.getConnectionStatus.bind(dbConnection);