import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { SavePhoto ,getPhoto,deletePhoto} from "../controller/gallery.controller.js";

const router=Router()

router.route("/save-photo").post(upload.single("photo"),SavePhoto)
router.route("/get-photo").get(getPhoto)
router.route("/delete").post(deletePhoto)

export default router