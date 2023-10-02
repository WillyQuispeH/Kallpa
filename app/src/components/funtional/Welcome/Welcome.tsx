import React, { useState, useEffect } from "react";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import BarGraph from "@/components/ui/BarGraph";
import { options, colors, meses } from "@/data/barGraph";
import styles from "./Welcome.module.scss";
import CardList from "@/components/ui/CardList";
import useInvestment from "@/store/hooks/useInvestment";
import Input from "@/components/ui/Input";
import CardAmount from "@/components/ui/CardAmount";
import IDataInvetment from "@/interfaces/dataInvestment";
import ComboBox from "@/components/ui/ComboBox";

const Welcome = () => {
  const { investmentList } = useInvestment();
  const [yearList, setYearList] = useState(investmentList);
  const [year, setYear] = useState("Todo");

  useEffect(() => {
    if (investmentList.length > 0) {
      setYearList(investmentList);
    }
  }, [investmentList]);

  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  const totalAmount = yearList?.reduce((total, inversion) => {
    return total + parseFloat(inversion.investment.amount);
  }, 0);

  const amountMax =
    yearList.length > 0
      ? yearList.reduce((max, inversion) => {
          const monto = parseFloat(inversion.investment.amount);
          return monto > parseFloat(max.investment.amount) ? inversion : max;
        })
      : { investment: { amount: "0" } };

  const amountMin =
    yearList.length > 0
      ? yearList?.reduce((min, inversion) => {
          const monto = parseFloat(inversion.investment.amount);
          return monto < parseFloat(min.investment.amount) ? inversion : min;
        })
      : { investment: { amount: "0" } };

  const investmentsPerMonth: Record<string, number> = {};
  const lapsed = yearList.filter(
    (item) => item.investment.state === "Caducado"
  );
  const current = yearList.filter(
    (item) => item.investment.state === "Vigente"
  );
  const finished = yearList.filter(
    (item) => item.investment.state === "Terminado"
  );

  meses.forEach((mes) => {
    investmentsPerMonth[mes] = 0;
  });

  yearList.forEach((item) => {
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
      value: yearList.length || 0,
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
  const dataAmount = [
    {
      title: "Total",
      icon: "paid",
      value: formatter.format(totalAmount),
    },
    {
      title: "Inversionista Top",
      icon: "vertical_align_top",
      value: formatter.format(parseInt(amountMax?.investment?.amount)),
    },
    {
      title: "Inversiones Menor",
      icon: "vertical_align_bottom",
      value: formatter.format(parseInt(amountMin?.investment?.amount)),
    },
  ];

  const yearListOption = [
    {
      name: "Todo",
    },
    {
      name: "2020",
    },
    {
      name: "2021",
    },
    {
      name: "2022",
    },
    {
      name: "2023",
    },
    {
      name: "2024",
    },
  ];

  const investmentYear = (inversiones: IDataInvetment[], yearDate: any) => {
    if (yearDate === "Todo") {
      return inversiones;
    } else {
      return inversiones.filter((inversion) => {
        const registroDate = inversion.investment.registrationdate;
        const year = registroDate.split("/")[2];
        return year === yearDate;
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = investmentYear(investmentList, e.target.value);
    setYear(e.target.value);
    setYearList(data);
  };

  return (
    <>
      <Seccion>
        <div className={styles.contenMainGraps}>
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
          <div className={styles.contenListAmount}>
            <ComboBox
              value={year}
              onChange={handleOnChange}
              isValid={true}
              width="265px"
              label="Seleccione el año"
              data={yearListOption}
              valueName="name"
              textName="name"
              name="proyect"
            />
            {dataAmount.map((item, key) => (
              <CardAmount
                key={key}
                value={item.value}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </Seccion>
    </>
  );
};

export default Welcome;
