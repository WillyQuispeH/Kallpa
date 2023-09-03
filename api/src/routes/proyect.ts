import { Router } from "express";

import { auth } from "../middlewares/auth";
import * as ProyectController from "../controllers/proyect";

const ProyectRouter = Router();

ProyectRouter.post("/create", auth, ProyectController.create);
ProyectRouter.get("/getAll", auth, ProyectController.getAll);

export default ProyectRouter;
