import { Router } from "express";
import { connectDb } from "../../lib/db.js";
import { Url } from "../../models/url.js";
const addRouter = Router();
(async () => {
  await connectDb();
})();

addRouter.post("/add", async (req, res) => {
  const { url } = req.body;
  const existing = await Url.findOne({ url });
  const host = req.get("host");
  try {
    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "No URL provided" });
    }
    if (existing) {
      return res.json({ shortUrl: existing.shortUrl });
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    // const shortenUrl = `https://${host}/${code}`;

    const newUrl = new Url({ url, code });
    await newUrl.save();
    res.json({ message: "Added new url", newurl: `https://${host}/${code}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default addRouter;
