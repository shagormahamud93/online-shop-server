import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server Running</title>
        <style>
          body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            font-family: Arial, sans-serif; 
            background-color: #f0f0f0;
          }
          .message {
            padding: 30px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
            font-size: 24px;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="message">
          🎉 Server is running at http://localhost:${PORT} 🎉
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
