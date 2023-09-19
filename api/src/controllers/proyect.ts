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
      return;
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
      return;
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

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const result = await ProyectModel.remove(id);

    const getAllResult = await ProyectModel.getAll();

    if (!result.success) {
      createLogger.error({
        model: "proyect/remove",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: getAllResult.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "proyect/remove",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, name, code, date } = req.body;

    const result = await ProyectModel.update(id, name, code, date);

    const getAllResult = await ProyectModel.getAll();

    if (!result.success) {
      createLogger.error({
        model: "proyect/update",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: getAllResult.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "proyect/update",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { create, getAll, update, remove };
