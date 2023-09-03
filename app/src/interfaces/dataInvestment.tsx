import IInvestment from "./investment";
import IPerson from "./person";

export default interface IDataInvetment {
  investment: IInvestment;
  inversor: IPerson;
}

export const initData = {
  investment: {
    id: "",
    investment_id: "",
    amount: "",
    registrationdate: "",
    months: "",
    enddate: "",
    returnpercentage: "",
    interests: "",
    monthpay: "",
    retention: "",
    subtotal: "",
    total: "",
    state: "",
    proyect: "",
  },
  inversor: {
    id: "",
    dni: "",
    name: "",
    paternallastname: "",
    maternallastname: "",
    email: "",
    address: "",
    phone: "",
  },
};
