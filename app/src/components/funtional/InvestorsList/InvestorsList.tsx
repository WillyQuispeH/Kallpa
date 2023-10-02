import Tabs from "@/components/ui/Taps";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import React from "react";
import Current from "./Current";
import Lapsed from "./Lapsed";
import { useInvestment } from "@/store/hooks";
import Finished from "./Finished";

const InvestorsList = () => {
  const { investmentList } = useInvestment();

  const current = investmentList.filter(
    (item) => item.investment.state === "Vigente"
  );

  const lapsed = investmentList.filter(
    (item) => item.investment.state === "Caducado"
  );
  const finished = investmentList.filter(
    (item) => item.investment.state === "Terminado"
  );

  const tabs = [
    {
      id: 1,
      title: (
        <>
          <h1>Inversiones vigentes ({current.length}) </h1>
          <h2>Vigentes ({current.length}) </h2>
        </>
      ),

      content: <Current data={current} />,
    },
    {
      id: 2,
      title: (
        <>
          <h1>Inversiones caducadas ({lapsed.length})</h1>
          <h2>Caducadas ({lapsed.length})</h2>
        </>
      ),

      content: <Lapsed data={lapsed} />,
    },
    {
      id: 3,
      title: (
        <>
          <h1>Inversiones terminadas ({finished.length})</h1>
          <h2>Terminadas ({finished.length})</h2>
        </>
      ),

      content: <Finished data={finished} />,
    },
  ];

  return (
    <>
      <Seccion title="Lista de inversionistas">
        <Tabs tabs={tabs} />
      </Seccion>
    </>
  );
};

export default InvestorsList;
