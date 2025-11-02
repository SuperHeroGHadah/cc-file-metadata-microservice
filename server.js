import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

// Allow FCC tests & your browser to hit the API
app.use(cors());

// Serve the demo form
app.use(express.static("public"));

// Use in-memory storage so it also works on Render/Railway (ephemeral FS)
const upload = multer({ storage: multer.memoryStorage() });

// Root page (served from /public/index.html)
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

// FCC required endpoint & field name: POST /api/fileanalyse with "upfile"
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;

  // FCC expects these exact keys:
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Port for local & Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`File metadata service listening on port ${PORT}`);
});
