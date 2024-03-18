import { Router } from "express";
import { createUser, getUsersByEmailPassword} from '../controllers/users.controller.js'
const router =  toAsyncRouter(Router());

router.post("/register", createUser)
router.post("/login", getUsersByEmailPassword)
import toAsyncRouter from 'async-express-decorator';

export default router;
