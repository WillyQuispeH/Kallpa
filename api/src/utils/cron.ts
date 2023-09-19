import cron from "node-cron";
import * as InvestmentModels from "../models/investment";
import * as Email from "./email";
import createLogger from "./logger";

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

  for (const tarea of dataEnd) {
    const { investment, inversor } = tarea;

    const [dia, mes, anio] = investment.enddate.split("/");

    const mailOptions: MailOptionsT = {
      subject: "prueba",
      name: inversor.name,
      paternalLastName: inversor.paternallastname,
      maternalLastName: inversor.maternalLastName,
      email: inversor.email,
    };
    // console.log(`0 */10 ${dia} ${mesNumero[mes]} *`);
    // console.log(`*/1 * ${dia} ${mesNumero[mes]} *`);
    cron.schedule(`*/1 * ${dia} ${mesNumero[mes]} *`, async () => {
      const result = await Email.send(mailOptions, []);
    });
  }
};

export default createCronsFunctions;
