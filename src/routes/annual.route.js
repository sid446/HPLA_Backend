import { createAnnualReport } from "../controller/annual.controller.js";
import { Router } from "express";
import { getAnnualReport } from "../controller/annual.controller.js";
import { deleteAnnualReport } from "../controller/annual.controller.js";
import { editAnnualReport } from "../controller/annual.controller.js";

const router=Router()

router.post("/create-annual",createAnnualReport)
router.get("/get-annual",getAnnualReport)
router.post("/delete-annual",deleteAnnualReport)
router.post("/edit-annual",editAnnualReport)


export default router