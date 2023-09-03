import { Request, Response } from "express";
import createLogger from "../utils/logger";
import * as ProyectModel from "../models/proyect";

const create = async (req: Request, res: Response) => {
  try {
    const { name, code, date } = req.body;

    const result = await ProyectModel.create(name, code, date);

    if (!result.success) {
      createLogger.error({
        model: "proyect/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "proyect/create",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await ProyectModel.getAll();

    if (!result.success) {
      createLogger.error({
        model: "proyect/getAll",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "proyect/getAll",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { create, getAll };
