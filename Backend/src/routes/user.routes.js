import { Router } from "express";
import { 
  createUser, updateUser, deleteUser, 
  getAllUsers
} 
from "../controllers/user.controller.js";

const router =  Router();

router.route("/get-users").get(getAllUsers);
router.route("/create").post(createUser);
router.route("/update-user/:userId").patch(updateUser);
router.route("/delete/:userId").post(deleteUser);


export default router