import { Request, Response } from "express";
import createLogger from "../utils/logger";
import * as InvestmentPersonModels from "../models/personInvestment";
import * as InvestmentModels from "../models/investment";
import * as PersonModels from "../models/person";

type IInvertor = {
  dni: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  email: string;
  phone: string;
};
type IInvestment = {
  amount: string;
  registrationdate: string;
  months: string;
  enddate: string;
  returnpercentage: string;
  interests: string;
  monthpay: string;
  retention: string;
  subtotal: string;
  total: string;
  proyect: string;
};

const create = async (req: Request, res: Response) => {
  try {
    const { invertor, investment } = req.body;

    const person = await createPerson(invertor);
    const investmentData = await createInvestment(investment);

    const result = await InvestmentPersonModels.create(
      person.id,
      investmentData.id
    );
    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const dataToSend = {
      invertor: person,
      investment: investmentData,
    };

    res.status(200).json({ success: true, data: dataToSend, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/create",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await InvestmentModels.getAll();

    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/create",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const result = await InvestmentModels.getById(id);

    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/getById",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/getById",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const getByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;

    const result = await InvestmentModels.getByDni(dni);

    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/getByDni",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/getByDni",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const createPerson = async (invertor: IInvertor) => {
  const result = await PersonModels.create(
    invertor.dni,
    invertor.name,
    invertor.paternallastname,
    invertor.maternallastname,
    invertor.address,
    invertor.email,
    invertor.phone
  );
  createLogger.info({
    model: "person/create",
    error: result.data,
  });
  if (!result.success) {
    createLogger.error({
      model: "investmentDetail/create",
      error: result.error,
    });

    return null;
  }
  return result.data;
};

const createInvestment = async (investment: IInvestment) => {
  const result = await InvestmentModels.create(
    investment.amount,
    investment.registrationdate,
    investment.months,
    investment.enddate,
    investment.returnpercentage,
    investment.interests,
    investment.monthpay,
    investment.retention,
    investment.subtotal,
    investment.total,
    "Vigente",
    investment.proyect
  );
  createLogger.info({
    model: "person/create",
    error: result.data,
  });

  if (!result.success) {
    createLogger.error({
      model: "investmentDetail/create",
      error: result.error,
    });

    return null;
  }
  return result.data;
};

const update = async (req: Request, res: Response) => {
  try {
    const {
      id,
      amount,
      registrationdate,
      months,
      enddate,
      returnpercentage,
      interests,
      monthpay,
      retention,
      subtotal,
      total,
      state,
      proyect,
    } = req.body;

    const result = await InvestmentModels.update(
      id,
      amount,
      registrationdate,
      months,
      enddate,
      returnpercentage,
      interests,
      monthpay,
      retention,
      subtotal,
      total,
      state,
      proyect
    );

    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/update",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/update",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

const updateState = async (req: Request, res: Response) => {
  try {
    const { id, state } = req.body;

    const result = await InvestmentModels.updateState(id, state);

    if (!result.success) {
      createLogger.error({
        model: "investmentDetail/updateState",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    createLogger.error({
      controller: "investmentDetail/updateState",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { create, getAll, getById, update, updateState, getByDni };
