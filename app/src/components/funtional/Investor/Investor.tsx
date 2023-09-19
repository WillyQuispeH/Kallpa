import { useEffect, useState } from "react";
import { Column, Row } from "@/components/layout/Generic";
import { dataForm, dataFormInvestor } from "./data";
import ClaimType from "@/components/ui/ClaimType";
import Input from "@/components/ui/Input";
import ComboBox from "@/components/ui/ComboBox";
import InputData from "@/components/ui/InputData";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";
import { usePerson } from "@/store/hooks";
import { addMonths, format, parse } from "date-fns";
import { es } from "date-fns/locale";
import Title from "@/components/ui/Title";
import useInvestment from "@/store/hooks/useInvestment";
import { isValidEmail, isValidPhone } from "@/utils/validate";
import useProyect from "@/store/hooks/useProyect";

const Investor = () => {
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  const [form, setForm] = useState(dataForm);
  const [formInvestor, setFormInvestor] = useState(dataFormInvestor);
  const [isValidForm, setIsValidForm] = useState(false);
  const { person, isLoadingPerson, getByDniPerson } = usePerson();
  const { isLoadingInvestment, createInvestment } = useInvestment();
  const { listProyect } = useProyect();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnBlurDni = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      dni: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
    getByDniPerson(e.target.value.trim());
  };

  const handleOnchangeProyect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInvestor({
      ...formInvestor,
      proyect: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeInvestorMonth = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fechaInicial = parse(
      formInvestor.registrationdate.value,
      "dd/MM/yyyy",
      new Date()
    );
    const options = { locale: es };

    const month = parseInt(e.target.value, 10) || 0;
    const fechaFinal = addMonths(fechaInicial, month);
    const nombreMes = format(fechaFinal, "MMMM", options).toUpperCase();
    const fechaFormateada = format(fechaFinal, "dd/MM/yyyy");
    setFormInvestor({
      ...formInvestor,
      months: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
      enddate: {
        value: month !== 0 ? fechaFormateada : "",
        isValid: e.target.value !== "" ? true : false,
      },
      monthpay: {
        value: month !== 0 ? nombreMes : "",
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeInvestorPercentage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const amount = Number(
      formInvestor.amount.value.replace(/[^0-9.-]+/g, "")
    ).toString();
    const interests =
      (parseFloat(amount) * parseFloat(e.target.value || "0")) / 100;
    const formattedAmount = formatter.format(interests);

    const retention = interests * 0.05;
    const formattedRetention = formatter.format(retention);

    const subTotal = parseFloat(amount) + interests;
    const formattedSubTotal = formatter.format(subTotal);

    const total = subTotal - retention;
    const formattedTotal = formatter.format(total);

    setFormInvestor({
      ...formInvestor,
      returnpercentage: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
      interests: {
        value: formattedAmount.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      retention: {
        value: formattedRetention.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      subtotal: {
        value: formattedSubTotal.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      total: {
        value: formattedTotal.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const returnpercentage = Number(
      formInvestor.returnpercentage.value.replace(/[^0-9.-]+/g, "")
    ).toString();

    const interests =
      (parseFloat(e.target.value || "0") * parseFloat(returnpercentage)) / 100;
    const formattedAmount = formatter.format(interests);

    const retention = interests * 0.05;
    const formattedRetention = formatter.format(retention);

    const subTotal = parseFloat(e.target.value || "0") + interests;
    const formattedSubTotal = formatter.format(subTotal);

    const total = subTotal - retention;
    const formattedTotal = formatter.format(total);

    setFormInvestor({
      ...formInvestor,
      amount: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
      interests: {
        value: formattedAmount.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      retention: {
        value: formattedRetention.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      subtotal: {
        value: formattedSubTotal.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
      total: {
        value: formattedTotal.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnBlurAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim(); // Eliminamos espacios en blanco
    const numericValue = parseFloat(inputValue);

    setFormInvestor({
      ...formInvestor,
      amount: {
        value: isNaN(numericValue) ? "" : formatter.format(numericValue),
        isValid: inputValue !== "" ? true : false,
      },
    });
  };

  const handleOnFocusAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseFloat(inputValue.replace(/[^0-9.-]+/g, ""));

    setFormInvestor({
      ...formInvestor,
      amount: {
        value: isNaN(numericValue) ? "" : numericValue.toString(),
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: isValidEmail(e.target.value),
      },
    });
  };

  const handleOnchangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: isValidPhone(e.target.value),
      },
    });
  };

  const handleOnClickSubmit = () => {
    const invertor = {
      dni: form.dni.value,
      name: form.name.value,
      paternallastname: form.paternallastname.value,
      maternallastname: form.maternallastname.value,
      address: form.address.value,
      email: form.email.value,
      phone: form.phone.value,
    };

    const investment = {
      amount: parseFloat(formInvestor.amount.value.replace(/[^0-9.-]+/g, "")),
      registrationdate: formInvestor.registrationdate.value,
      months: formInvestor.months.value,
      enddate: formInvestor.enddate.value,
      returnpercentage: formInvestor.returnpercentage.value,
      interests: parseFloat(
        formInvestor.interests.value.replace(/[^0-9.-]+/g, "")
      ),
      monthpay: formInvestor.monthpay.value,
      retention: parseFloat(
        formInvestor.retention.value.replace(/[^0-9.-]+/g, "")
      ),
      subtotal: parseFloat(
        formInvestor.subtotal.value.replace(/[^0-9.-]+/g, "")
      ),
      total: parseFloat(formInvestor.total.value.replace(/[^0-9.-]+/g, "")),
      proyect: formInvestor.proyect.value,
    };

    if (isValidForm) {
      createInvestment(invertor, investment);
    }
  };

  const validateDataForm = (data: any) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const field = data[key];
        if (field.value === "" || !field.isValid) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    const isValidFormInvestor = validateDataForm(formInvestor);
    const isValidForm = validateDataForm(form);

    if (isValidFormInvestor && isValidForm) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form, formInvestor]);

  useEffect(() => {
    if (person.id !== "") {
      setForm({
        ...form,
        dni: { value: person.dni, isValid: true },
        name: { value: person.name, isValid: true },
        paternallastname: { value: person.paternallastname, isValid: true },
        maternallastname: { value: person.maternallastname, isValid: true },
        address: { value: person.address, isValid: true },
        email: { value: person.email, isValid: true },
        phone: { value: person.phone, isValid: true },
      });
    }
  }, [person]);

  return (
    <>
      <Seccion title="Nuevo inversionita">
        <Row gap="126px">
          <Column gap="5px">
            <Title value="Datos del inversionista" width="305px" />
            <Row gap="5px">
              <Input
                label="DNI"
                type="text"
                name="dni"
                width="200px"
                value={form.dni.value}
                onChange={handleOnchange}
                onBlur={handleOnBlurDni}
                isValid={form.dni.isValid}
              />
              <ClaimType width="100px" isLoading={isLoadingPerson} />
            </Row>
            <Input
              label="Nombre"
              type="text"
              name="name"
              width="305px"
              value={form.name.value}
              onChange={handleOnchange}
              isValid={form.name.isValid}
            />
            <Input
              label="Apellido paterno"
              type="text"
              name="paternallastname"
              width="305px"
              value={form.paternallastname.value}
              onChange={handleOnchange}
              isValid={form.paternallastname.isValid}
            />
            <Input
              label="Apellido materno"
              type="text"
              name="maternallastname"
              width="305px"
              value={form.maternallastname.value}
              onChange={handleOnchange}
              isValid={form.maternallastname.isValid}
            />
            <Input
              label="Dirección"
              type="text"
              name="address"
              width="305px"
              value={form.address.value}
              onChange={handleOnchange}
              isValid={form.address.isValid}
            />
            <Input
              label="Correo electronico"
              type="text"
              name="email"
              width="305px"
              value={form.email.value}
              onChange={handleOnchangeEmail}
              isValid={form.email.isValid}
            />
            <Input
              label="Teléfono"
              type="number"
              name="phone"
              width="180px"
              value={form.phone.value}
              onChange={handleOnchangePhone}
              isValid={form.phone.isValid}
            />
          </Column>
          <Column gap="5px">
            <Title value="Proyecto a invertir" width="315px" />
            <ComboBox
              value={formInvestor.proyect.value}
              onChange={handleOnchangeProyect}
              isValid={formInvestor.proyect.isValid}
              width="315px"
              label="Tipo de reclamo"
              data={listProyect}
              valueName="name"
              textName="name"
              name="proyect"
            />
          </Column>
          <Column gap="5px">
            <Title value="Datos de la inversión" width="315px" />

            <Row gap="5px">
              <Column gap="5px">
                <Input
                  label="Monto"
                  type="text"
                  name="amount"
                  width="180px"
                  value={formInvestor.amount.value}
                  onChange={handleOnchangeAmount}
                  onBlur={handleOnBlurAmount}
                  onFocus={handleOnFocusAmount}
                  isValid={formInvestor.amount.isValid}
                />
                <Input
                  label="Tiempo en meses"
                  type="number"
                  name="months"
                  width="180px"
                  value={formInvestor.months.value}
                  onChange={handleOnchangeInvestorMonth}
                  isValid={formInvestor.months.isValid}
                />
                <Input
                  label="% de retorno"
                  type="string"
                  name="returnpercentage"
                  width="180px"
                  value={formInvestor.returnpercentage.value}
                  onChange={handleOnchangeInvestorPercentage}
                  isValid={formInvestor.returnpercentage.isValid}
                />
                <InputData
                  label="Mes de pago"
                  width="180px"
                  value={formInvestor.monthpay.value}
                />
                <InputData
                  label="Sub Total"
                  width="180px"
                  value={formInvestor.subtotal.value}
                />
              </Column>
              <Column gap="5px">
                <InputData
                  label="Fecha de incripción"
                  width="130px"
                  value={formInvestor.registrationdate.value}
                />
                <InputData
                  label="Fecha de termino"
                  width="130px"
                  value={formInvestor.enddate.value}
                />
                <InputData
                  label="Intereses"
                  width="130px"
                  value={formInvestor.interests.value}
                />
                <InputData
                  label="Retención"
                  width="130px"
                  value={formInvestor.retention.value}
                />
                <InputData
                  label="Total"
                  width="130px"
                  value={formInvestor.total.value}
                />
              </Column>
            </Row>
          </Column>
        </Row>
      </Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Registrar"
          width="200px"
          height="50px"
          disabled={!isValidForm}
          isLoading={isLoadingInvestment}
        />
      </SeccionFooter>
    </>
  );
};

export default Investor;
