import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";
import { userController } from "./user.controller";
import userTokenVerify from "../../middleware/userTokenVerify";

const router = Router();

router.post("/register", validateRequest(UserValidation.userValidationSchema), userController.userCreated);
router.post("/login", validateRequest(UserValidation.loginValidationSchema), userController.userLogin);
router.post("/user-info", validateRequest(UserValidation.getUserValidationSchema), userController.getloginUser);
router.put("/update-profile/:id", userTokenVerify, validateRequest(UserValidation.UpdateuserValidationSchema), userController.updateUserInfo);
router.put("/upload-profile", userTokenVerify, userController.updateUserPictureInfo);

export const userRouter = router;
