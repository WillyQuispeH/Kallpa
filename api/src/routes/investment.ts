import { Router } from "express";

import { auth } from "../middlewares/auth";
import * as InvestmentController from "../controllers/investment";

const InvestmentRouter = Router();

InvestmentRouter.post("/create", auth, InvestmentController.create);
InvestmentRouter.get("/getAll", auth, InvestmentController.getAll);
InvestmentRouter.post("/getById", auth, InvestmentController.getById);
InvestmentRouter.get("/getByDni/:dni", auth, InvestmentController.getByDni);
InvestmentRouter.post("/update", auth, InvestmentController.update);
InvestmentRouter.post("/updateState", auth, InvestmentController.updateState);

export default InvestmentRouter;
