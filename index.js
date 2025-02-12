import express from "express";
import url from "url";
import path from "path";
import { connectDb } from "./lib/db.js";
import slugRouter from "./routes/slug.js";
import { addUrl, addUser } from "./routes/api/routes.js";
const app = express();

const PORT = 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api", addUrl);
app.use("/api", addUser);
app.use("/", slugRouter);
(async () => {
  await connectDb();
})();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Shortly :: Listening to http://localhost:${PORT}`);
});
