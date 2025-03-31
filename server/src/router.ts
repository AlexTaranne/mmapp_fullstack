import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import auth from "./middleware/auth";
import form from "./middleware/form";
import upload from "./middleware/upload";
import fightActions from "./modules/fight/fightActions";
import fighterActions from "./modules/fighter/fighterActions";
import useActions from "./modules/user/useActions";

router.get("/api/fighter", fighterActions.browse);
router.post(
  "/api/fighter",
  auth.verify,
  auth.checkIfAdmin,
  form.validate,
  fighterActions.add,
);
router.get("/api/fighter/:firstName-:lastName", fighterActions.read);
router.delete("/api/fighter/:id", fighterActions.destroy);
router.put("/api/fighter/:id", fighterActions.edit);

router.get("/api/users", useActions.browse);

router.get("/api/users/:id", upload.uploadFile, useActions.read);
router.post("/api/users", upload.uploadFile, auth.hashPassword, useActions.add);
router.post("/api/login", auth.login);
router.put("/api/users/:id", upload.uploadFile, useActions.edit);
router.delete("/api/users/:id", useActions.destroy);

router.get("/api/fights", fightActions.browse);
router.put("/api/fights/:id", fightActions.edit);
router.post("/api/fights", fightActions.add);
router.delete("/api/fights/:id", fightActions.destroy);

router.get(
  "/api/checkAdmin",
  auth.verify,
  auth.checkIfAdmin,
  useActions.sendSuccessStatus,
);

router.get(
  "/api/checkAdminOrUser",
  auth.verify,
  auth.checkIfAdminOrUser,
  useActions.sendSuccessStatus,
);

router.get("/api/logout", auth.logout);
export default router;
