import cors from "cors";
import express from "express";
import dataRoutes from "./src/routes/data-routes";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["https://streamify-web.vercel.app/", "http://localhost:5173/"],
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
