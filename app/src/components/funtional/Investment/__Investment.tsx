import React from "react";
import styles from "./Investment.module.scss";
import CardPerson from "@/components/ui/CardPerson/CardPerson";
import { Column, Row } from "@/components/layout/Generic";
import CardInves from "@/components/ui/CardInves";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";
import InputData from "@/components/ui/InputData";
import useInvestment from "@/store/hooks/useInvestment";

const __Investment = () => {
  const { investment } = useInvestment();

  const { inversor, investment: data } = investment;
  const { proyect } = data;

  const handleOnclick = () => {};
  return (
    <Seccion title="Nuevo inversionita">
      <div className={styles.investment}>
        <Row gap="90px">
          <CardPerson data={inversor} />
          <InputData label="Proyecto" value={proyect} width="315px" />
          <CardInves data={data} />
        </Row>
      </div>
      <SeccionFooter>
        <Button
          onClick={handleOnclick}
          valor="Siguiente"
          width="200px"
          height="50px"
          disabled={true}
        />
      </SeccionFooter>
    </Seccion>
  );
};

export default __Investment;
