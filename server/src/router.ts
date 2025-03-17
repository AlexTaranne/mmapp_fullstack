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
import fighterActions from "./modules/fighter/fighterActions";
import useActions from "./modules/user/useActions";

router.get("/api/fighter", fighterActions.browse);
router.post("/api/fighter", fighterActions.add);
router.get("/api/fighter/:firstName-:lastName", fighterActions.read);
router.delete("/api/fighter/:id", fighterActions.destroy);
router.put("/api/fighter/:id", fighterActions.edit);

router.get("/api/users", useActions.browse);

router.get("/api/users/:id", useActions.read);
router.post("/api/users", auth.hashPassword, useActions.add);
router.post("/api/login", auth.login);
router.delete("/api/users/:id", useActions.destroy);
export default router;
