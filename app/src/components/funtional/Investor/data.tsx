import { addMonths, format, parse } from "date-fns";
const dataForm = {
  dni: { value: "", isValid: true },
  name: { value: "", isValid: true },
  paternallastname: { value: "", isValid: true },
  maternallastname: { value: "", isValid: true },
  phone: { value: "", isValid: true },
  address: { value: "", isValid: true },
  email: { value: "", isValid: true },
};

const dataFormInvestor = {
  proyect: { value: "", isValid: true },
  amount: { value: "", isValid: true },
  registrationdate: {
    value: format(new Date(), "dd/MM/yyyy"),
    isValid: true,
  },
  months: { value: "", isValid: true },
  enddate: { value: "", isValid: true },
  returnpercentage: { value: "", isValid: true },
  interests: { value: "", isValid: true },
  monthpay: { value: "", isValid: true },
  retention: { value: "", isValid: true },
  subtotal: { value: "", isValid: true },
  total: { value: "", isValid: true },
};
const data = [
  { value: "", text: "-- Seleccione --" },
  { value: "Tarpuy", text: "Tarpuy" },
  { value: "Sabandia", text: "Sabandia" },
  { value: "Suyay", text: "Suyay" },
  { value: "ninguno", text: "Sin proyecto" },
];

export { dataForm, dataFormInvestor, data };
