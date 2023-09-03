import { Router } from "express";

import { auth } from "../middlewares/auth";
import * as InvestmentController from "../controllers/investment";

const InvestmentRouter = Router();

InvestmentRouter.post("/create", auth, InvestmentController.create);
InvestmentRouter.get("/getAll", auth, InvestmentController.getAll);
InvestmentRouter.post("/getById", auth, InvestmentController.getById);

export default InvestmentRouter;
