import { Router } from "express";
import { connectDb } from "../lib/db.js";
import { Url } from "../models/url.js";

const slugRouter = Router();
(async () => {
  await connectDb();
})();

slugRouter.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const exists = await Url.findOne({ code: code });
    if (exists) {
      res.redirect(exists.url);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Short URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default slugRouter;
