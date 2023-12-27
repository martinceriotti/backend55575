import { Router } from "express";
import { createUser, getUsersByEmailPassword} from '../controllers/users.controller.js'
const router = Router();

router.post("/register", createUser)
router.post("/login", getUsersByEmailPassword)

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await usersModel.findOne({ email, password });

//     if (!user) {
//       return res
//         .status(400)
//         .send({ status: "error", message: "incorrect credentials" });
//     }

//     req.session.user = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//     };

//     res.send({ status: "success", message: "login success" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: "error", message: error.message });
//   }
// });

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error)
      return res.status(500).send({ status: "error", message: error.message });
    res.redirect("/");
  });
});

export default router;
