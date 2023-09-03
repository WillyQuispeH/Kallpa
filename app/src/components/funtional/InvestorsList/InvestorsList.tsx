import Tabs from "@/components/ui/Taps";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import React from "react";
import Current from "./Current";
import Lapsed from "./Lapsed";
import useInvestment from "@/store/hooks/useInvestment";
import IDataInvetment from "@/interfaces/dataInvestment";
import Finished from "./Finished";

const InvestorsList = () => {
  const { investmentList } = useInvestment();

  const lapsed = investmentList.filter(
    (item) => item.investment.state === "Caducado"
  );
  const current = investmentList.filter(
    (item) => item.investment.state === "Vigente"
  );
  const finished = investmentList.filter(
    (item) => item.investment.state === "Terminado"
  );

  const tabs = [
    {
      id: 1,
      title: <h1>Inversiones vigentes </h1>,

      content: <Current data={current} />,
    },
    {
      id: 2,
      title: <h1>Inversiones caducadas</h1>,

      content: <Lapsed data={lapsed} />,
    },
    {
      id: 3,
      title: <h1>Inversiones terminadas</h1>,

      content: <Finished data={finished} />,
    },
  ];

  return (
    <>
      <Seccion title="Nuevo inversionita">
        <Tabs tabs={tabs} />
      </Seccion>
    </>
  );
};

export default InvestorsList;
