import "dotenv/config";
import express from "express";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.route.js";
import { errorHandler } from "./src/middleware/error-handler.js";
import cors from 'cors'

const app = express();

app.use(
  cors({
    origin: 'https://chat-gpt-clone-ten-lyart.vercel.app'
  })
)
app.use(express.json());
app.use("/api", mainRouter);

// final middleware for error handling
app.use(errorHandler);

async function startServer() {
  try {
    const connection = await db.getConnection();
    connection.release();
    console.log("Database connected successfully");
    let PORT = 3898;
    app.listen(PORT, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Server is running on port http://localhost:${PORT}`);
      }
    });
  } catch (error) {
    console.error("Failed to connect to the database:");
  }
}
startServer();
