import express from "express";
import url from "url";
import path from "path";
import { connectDb } from "./lib/db.js";
import slugRouter from "./routes/slug.js";
import addRouter from "./routes/api/add.js";
const app = express();

const PORT = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(express.json());
app.use("/api", addRouter);
app.use("/", slugRouter);
await connectDb();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Shortly :: Listening to https://localhost:${PORT}`);
});
