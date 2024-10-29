import { Router } from "express";
import adminController from "../controller/adminsController.js";

const router = Router();

router.post('/', adminController.addAdmin)

router.get('/', adminController.getAdmins)

router.delete('/', adminController.deleteAdmin)

export default router