import { Request, Response, NextFunction } from "express";

import createLogger from "../utils/logger";

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  createLogger.info({
    url: req.originalUrl,
    method: req.method,
    body: req.method === "POST" ? req.body : "",
    params: req.method !== "POST" ? req.params : "",
    query: req.method === "GET" ? req.query : "",
  });

  return next();
};

const resLogger = (req: Request, res: Response, next: any) => {
  return next();
};

export { reqLogger, resLogger };
