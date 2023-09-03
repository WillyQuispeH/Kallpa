import { Request, Response, NextFunction } from "express";

import config from "../utils/config";
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.id !== config.api_key) {
    res.status(401).json({ message: "Acceso no autorizado" });
    return;
  }
  return next();
};

export { auth };
