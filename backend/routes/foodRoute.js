import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodcontroller.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads", // corrected to 'destination' (lowercase 'd')
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`); // use backticks for template literals
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;