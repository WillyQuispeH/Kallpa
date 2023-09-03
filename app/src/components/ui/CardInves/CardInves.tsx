import React from "react";
import styles from "./CardInves.module.scss";
import { Column, Row } from "@/components/layout/Generic";
import InputData from "../InputData";
import IInvestment from "@/interfaces/investment";
interface ICardInves {
  data: IInvestment;
}
const CardInves = ({ data }: ICardInves) => {
  return (
    <div className={styles.cardInves}>
      <Column gap="5px">
        <Row gap="5px">
          <InputData label="Monto" width="180px" value={data.amount} />
          <InputData
            label="Fecha de incripción"
            width="130px"
            value={data.registrationdate}
          />
        </Row>
        <Row gap="5px">
          <InputData
            label="Tiempo en meses"
            width="180px"
            value={data.months}
          />
          <InputData
            label="Fecha de termino"
            width="130px"
            value={data.enddate}
          />
        </Row>
        <Row gap="5px">
          <InputData
            label="% de retorno"
            width="180px"
            value={data.returnpercentage}
          />
          <InputData label="Intereses" width="130px" value={data.interests} />
        </Row>
        <Row gap="5px">
          <InputData label="Mes de pago" width="180px" value={data.monthpay} />
          <InputData label="Retencíon" width="130px" value={data.retention} />
        </Row>
        <Row gap="5px">
          <InputData label="Sub total" width="180px" value={data.subtotal} />
          <InputData label="Total" width="130px" value={data.total} />
        </Row>
        <InputData label="Estado" width="180px" value="Caducado" />
      </Column>
    </div>
  );
};

export default CardInves;
