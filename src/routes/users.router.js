import { Router } from "express";
import toAsyncRouter from 'async-express-decorator';
import {getUsers, getUsersById, deleteUser, updateRoleUser} from '../controllers/users.controller.js'
import bodyParser from "body-parser";
const router =  toAsyncRouter(Router());

const privateAccess = (req, res, next) => {
  if (!req.session?.user   ) return res.redirect("/api/views/login");
  req.session?.user.role
  next();
};

const adminAccess = (req, res, next) => {
  if ( req.session?.user.role != "ADMIN" ) 
    return res.redirect("/api/views/login");
  next();
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(function (err, req, res, callback) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(403).send({
      error: false,
      message: "Wrong Body of json",
      response: null,
    });
    res.end();
  }
});

router.get('/', privateAccess, getUsers);
router.get('/:id', privateAccess, getUsersById);
router.post('/:id',  privateAccess, updateRoleUser);
router.delete('/:id', adminAccess, deleteUser);

export default router;