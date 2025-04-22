import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { saveNews,getNews,deleteNews } from "../controller/news.controller.js";


const router=Router()

router.route("/save-news").post(upload.array("images", 5), saveNews)
router.route("/get-news").get(getNews)
router.route("/delete-news").post(deleteNews)
export default router