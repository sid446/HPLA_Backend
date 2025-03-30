import { Router } from "express";
import { saveMember } from "../controller/member.controller.js";

const router=Router()

router.route("/save-member").post(saveMember)


export default router