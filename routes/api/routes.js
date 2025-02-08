import { Router } from "express";
import { connectDb } from "../../lib/db.js";
import { Url } from "../../models/url.js";
import { User } from "../../models/user.js";
const addUrl = Router();
const addUser = Router();
(async () => {
  await connectDb();
});

addUrl.post("/add", async (req, res) => {
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

addUser.post("/addUser", async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email: email });
  try {
    if (existing) {
      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "No email provided" });
      }
      if (existing) {
        return res.json({ email: existing.email });
      }
      const newUser = new User({ email, password });
      await newUser.save();
      res.json({ message: "New User Created" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { addUrl, addUser };
