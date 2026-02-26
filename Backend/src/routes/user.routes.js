import {Router} from "express";
import { logInUser, registerUser } from "../controllers/user-controller";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);



export default router;