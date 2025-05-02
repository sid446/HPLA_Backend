import { Router } from "express";
import { getAllMembers, saveMember, updateMember } from "../controller/member.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/save-member").post(upload.single("avatar"), saveMember);
router.route("/update-member").post(upload.single("avatar"), updateMember);
router.route("/get-members").get(getAllMembers)

export default router;
