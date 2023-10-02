import cron from "node-cron";
import * as InvestmentModels from "../models/investment";
import * as Email from "./email";
import createLogger from "./logger";
import { parse, isBefore } from "date-fns";

type MailOptionsT = {
  subject: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
};

type AttachmentsT = {
  fileName: string;
  urlDoc: String;
};

const createCronsFunctions = async () => {
  const resultModel = await InvestmentModels.getAll();

  const data = resultModel.data;
  await updateStateInvestment(data);
  const añoActual = new Date().getFullYear();

  const dataEnd = data.filter((item: any) => {
    const [dia, mes, anio] = item.investment.enddate.split("/");
    const añoInversion = parseInt(anio, 10);
    return añoInversion === añoActual;
  });

  const mesNumero: any = {
    "01": 1,
    "02": 2,
    "03": 3,
    "04": 4,
    "05": 5,
    "06": 6,
    "07": 7,
    "08": 8,
    "09": 9,
    "10": 10,
    "11": 11,
    "12": 12,
  };

  // for (const tarea of dataEnd) {
  //   const { investment, inversor } = tarea;

  //   const [dia, mes, anio] = investment.enddate.split("/");

  //   const mailOptions: MailOptionsT = {
  //     subject: "prueba",
  //     name: inversor.name,
  //     paternalLastName: inversor.paternallastname,
  //     maternalLastName: inversor.maternalLastName,
  //     email: inversor.email,
  //   };
  //   cron.schedule(`* */1 ${dia} ${mesNumero[mes]} *`, async () => {
  //     const result = await Email.send(mailOptions, []);
  //   });
  // }
};

const updateStateInvestment = async (data: any) => {
  const fechaActual = new Date();

  type TInvestment = {
    id: string;
    enddate: string;
    state: string;
  };

  const expired: any = [];
  const currend: any = [];

  data.forEach((inversion: any) => {
    const { id, enddate, state } = inversion.investment;
    const fechaVencimiento = parse(enddate, "dd/MM/yyyy", new Date());
    if (isBefore(fechaVencimiento, fechaActual)) {
      expired.push({ id, enddate, state });
    } else {
      currend.push({ id, enddate, state });
    }
  });

  const listExpired = expired.filter(
    (inversion: any) => inversion.state !== "Terminado"
  );

  const result = await Promise.all(
    listExpired.map(async (item: TInvestment) => {
      return await InvestmentModels.updateState(item.id, "Caducado");
    })
  );
};

export default createCronsFunctions;
