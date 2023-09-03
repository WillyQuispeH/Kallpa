import React from "react";
import styles from "./CardPerson.module.scss";
import IPerson from "@/interfaces/person";
import { Column, Row } from "@/components/layout/Generic";
import InputData from "../InputData";
import ClaimType from "../ClaimType";

interface ICardPerson {
  data: IPerson;
}
const CardPerson = ({ data }: ICardPerson) => {
  return (
    <div className={styles.cardPerson}>
      <Column gap="5px">
        <Row gap="5px">
          <InputData value="DNI" width="200px" label={data.dni} />
          <ClaimType width="100px" />
        </Row>
        <InputData label="Nombre" width="305px" value={data.name} />
        <InputData
          label="Apellido paterno"
          width="305px"
          value={data.paternallastname}
        />
        <InputData
          label="Apellido materno"
          width="305px"
          value={data.maternallastname}
        />
        <InputData label="Dirección" width="305px" value={data.address} />
        <InputData
          label="Correo electrónico"
          width="305px"
          value={data.email}
        />
        <InputData label="Teléfono" width="200px" value={data.phone} />
      </Column>
    </div>
  );
};

export default CardPerson;
