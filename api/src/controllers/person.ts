import { Request, Response } from "express";
import createLogger from "../utils/logger";
import * as PersonModels from "../models/person";

const create = async (req: Request, res: Response) => {
  try {
    const {
      dni,
      name,
      paternallastname,
      maternallastname,
      address,
      email,
      phone,
    } = req.body;

    const result = await PersonModels.create(
      dni,
      name,
      paternallastname,
      maternallastname,
      address,
      email,
      phone
    );

    if (!result.success) {
      createLogger.error({
        model: "person/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });

      return;
    }

    createLogger.info({
      model: "person/create",
      error: result.data,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      error: null,
    });
  } catch (e) {
    createLogger.error({
      controller: "person/create",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const getByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;

    const result = await PersonModels.getByDni(dni);

    if (!result.success) {
      createLogger.error({
        model: "person/getByDni",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });

      return;
    }

    createLogger.info({
      model: "person/getByDni",
      error: result.data,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      error: null,
    });
  } catch (e) {
    createLogger.error({
      controller: "person/getByDni",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { create, getByDni };
