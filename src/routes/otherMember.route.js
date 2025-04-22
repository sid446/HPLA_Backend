import { Router } from "express";
import { SaveOtherMember,UpdateOtherMember,deleteOtherMember,getAllOtherMembers } from "../controller/otherMember.controller.js";


const router = Router();

router.route("/save-other-member").post(SaveOtherMember);
router.route("/update-other-member").post(UpdateOtherMember);
router.route("/get-other-members").get(getAllOtherMembers )
router.route("/delete-other-member/:id").delete(deleteOtherMember)

export default router;
