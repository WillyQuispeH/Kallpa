import { Router } from "express";

import { auth } from "../middlewares/auth";
import * as PersonController from "../controllers/person";

const PersonRouter = Router();

PersonRouter.post("/create", auth, PersonController.create);
PersonRouter.get("/getByDni/:dni", auth, PersonController.getByDni);

export default PersonRouter;
