import { Router } from "express";
import { createUser, getUsersByEmailPassword} from '../controllers/users.controller.js'
import toAsyncRouter from 'async-express-decorator';

const router =  toAsyncRouter(Router());
router.post("/register", createUser)
router.post("/login", getUsersByEmailPassword)
export default router;
