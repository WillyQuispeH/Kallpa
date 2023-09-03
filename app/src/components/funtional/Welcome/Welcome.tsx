import React from "react";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import BarGraph from "@/components/ui/BarGraph";
import { options, colors, meses } from "@/data/barGraph";
import styles from "./Welcome.module.scss";
import CardList from "@/components/ui/CardList";
import useInvestment from "@/store/hooks/useInvestment";
import IDataInvetment from "@/interfaces/dataInvestment";

const Welcome = () => {
  const { investmentList } = useInvestment();

  const investmentsPerMonth: Record<string, number> = {};
  const lapsed = investmentList.filter(
    (item) => item.investment.state === "Caducado"
  );
  const current = investmentList.filter(
    (item) => item.investment.state === "Vigente"
  );
  const finished = investmentList.filter(
    (item) => item.investment.state === "Terminado"
  );

  meses.forEach((mes) => {
    investmentsPerMonth[mes] = 0;
  });
  investmentList.forEach((item) => {
    const month = item.investment.enddate.split("/")[1];
    investmentsPerMonth[meses[parseInt(month, 10) - 1]]++;
  });
  const investments = meses.map((mes) => investmentsPerMonth[mes]);

  const data = {
    labels: meses,
    datasets: [
      {
        label: "Inversiones",
        data: investments,
        backgroundColor: colors,
      },
    ],
  };

  const datCrad = [
    {
      title: "Total de inversiones",
      icon: "notifications",
      value: investmentList.length || 0,
    },
    {
      title: "Inversiones vigentes",
      icon: "hourglass_top",
      value: current.length || 0,
    },
    {
      title: "Inversiones caducadas",
      icon: "release_alert",
      value: lapsed.length || 0,
    },
    {
      title: "Inversiones Terminadas",
      icon: "download_done",
      value: finished.length || 0,
    },
  ];

  return (
    <>
      <Seccion>
        <div className={styles.contenMain}>
          <div className={styles.contenCardPanel}>
            {datCrad.map((item, key) => (
              <div key={key} className={styles.cardPanel}>
                <p className={styles.cardPanelTitle}>{item.title}</p>
                <span className="material-symbols-outlined">{item.icon}</span>
                <p className={styles.cardPanelValue}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className={styles.contenBarList}>
            <BarGraph
              data={data}
              options={options}
              title="Inversiones del año"
            />
            <CardList data={lapsed} />
          </div>
        </div>
      </Seccion>
    </>
  );
};

export default Welcome;
