import { Router } from "express";
import { addNotice,editNotice,DeleteNotice,getNotice } from "../controller/noticeBoard.controller.js";

const router=Router()

router.route("/saveNotice").post(addNotice)
router.route("/editNotice").post(editNotice)
router.route("/deleteNotice").delete(DeleteNotice)
router.route("/getNotice").get(getNotice)

export default router   