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

import fighterActions from "./modules/fighter/fighterActions";

router.get("/api/fighter", fighterActions.browse);
router.post("/api/fighter", fighterActions.add);
export default router;
