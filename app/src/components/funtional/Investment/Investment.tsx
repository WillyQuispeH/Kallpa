import { useEffect, useState } from "react";
import { Column, Row } from "@/components/layout/Generic";
import { dataForm, dataFormInvestor, data } from "./data";
import Input from "@/components/ui/Input";
import ComboBox from "@/components/ui/ComboBox";
import InputData from "@/components/ui/InputData";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";
import { useRouter } from "next/router";
import { addMonths, format, parse } from "date-fns";
import { es } from "date-fns/locale";
import Title from "@/components/ui/Title";
import useInvestment from "@/store/hooks/useInvestment";
import CardPerson from "@/components/ui/CardPerson/CardPerson";

import styles from "./Investment.module.scss";

const Investment = () => {
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });
  const router = useRouter();
  const { investmentId } = router.query;
  const [form, setForm] = useState(dataForm);
  const [formInvestor, setFormInvestor] = useState(dataFormInvestor);
  const [isValidForm, setIsValidForm] = useState(false);
  const {
    isLoadingInvestment,
    updateInvestment,
    updateStateInvestment,
    investment,
  } = useInvestment();
  const { inversor, investment: dataIn } = investment;
  const state = dataIn?.state;

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

  const handleOnClickSubmit = () => {
    const investment = {
      id: investmentId as string,
      amount: parseFloat(
        formInvestor.amount.value.replace(/[^0-9.-]+/g, "")
      ).toString(),
      registrationdate: formInvestor.registrationdate.value,
      months: formInvestor.months.value,
      enddate: formInvestor.enddate.value,
      returnpercentage: formInvestor.returnpercentage.value,
      interests: parseFloat(
        formInvestor.interests.value.replace(/[^0-9.-]+/g, "")
      ).toString(),
      monthpay: formInvestor.monthpay.value,
      retention: parseFloat(
        formInvestor.retention.value.replace(/[^0-9.-]+/g, "")
      ).toString(),
      subtotal: parseFloat(
        formInvestor.subtotal.value.replace(/[^0-9.-]+/g, "")
      ).toString(),
      total: parseFloat(
        formInvestor.total.value.replace(/[^0-9.-]+/g, "")
      ).toString(),
      proyect: formInvestor.proyect.value,
      state: "Vigente",
    };

    if (isValidForm) {
      updateInvestment(investment);
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
    if (dataIn.id !== "") {
      setForm({
        ...form,
        dni: { value: inversor.dni, isValid: true },
        name: { value: inversor.name, isValid: true },
        paternallastname: { value: inversor.paternallastname, isValid: true },
        maternallastname: { value: inversor.maternallastname, isValid: true },
        address: { value: inversor.address, isValid: true },
        email: { value: inversor.email, isValid: true },
        phone: { value: inversor.phone, isValid: true },
      });
    }
    setFormInvestor({
      ...formInvestor,
      proyect: { value: dataIn.proyect, isValid: true },
      amount: {
        value: formatter.format(parseFloat(dataIn.amount)),
        isValid: true,
      },
      registrationdate: { value: dataIn.registrationdate, isValid: true },
      months: { value: dataIn.months, isValid: true },
      enddate: { value: dataIn.enddate, isValid: true },
      returnpercentage: { value: dataIn.returnpercentage, isValid: true },
      interests: {
        value: formatter.format(parseFloat(dataIn.interests)),
        isValid: true,
      },
      monthpay: { value: dataIn.monthpay, isValid: true },
      retention: {
        value: formatter.format(parseFloat(dataIn.retention)),
        isValid: true,
      },
      subtotal: {
        value: formatter.format(parseFloat(dataIn.subtotal)),
        isValid: true,
      },
      total: {
        value: formatter.format(parseFloat(dataIn.total)),
        isValid: true,
      },
    });
  }, [investment]);

  return (
    <>
      <Seccion title={`Modo edición`} titleRight={`ID : ${dataIn.id}`}>
      <div className={styles.contentData}>
          <Column gap="5px">
            <Title value="Datos del inversionista" width="305px" />
            <CardPerson data={inversor} />
          </Column>
          <Column gap="5px">
            <Title value="Proyecto a invertir" width="315px" />
            <ComboBox
              value={formInvestor.proyect.value}
              onChange={handleOnchangeProyect}
              isValid={formInvestor.proyect.isValid}
              width="315px"
              label="Tipo de reclamo"
              data={data}
              valueName="value"
              textName="text"
              name="proyect"
            />
          </Column>
          <Column gap="5px">
            <Title value="Datos de la inversión" width="315px" />

            <Row gap="5px">
              <Column gap="5px">
                <InputData
                  value={formInvestor.amount.value}
                  label="Monto"
                  width="180px"
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
                <InputData label="Estado" width="180px" value={dataIn.state} />
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
          </div>
      </Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Guardar cambios"
          width="200px"
          height="50px"
          disabled={!isValidForm}
          isLoading={isLoadingInvestment}
        />
      </SeccionFooter>
    </>
  );
};

export default Investment;
