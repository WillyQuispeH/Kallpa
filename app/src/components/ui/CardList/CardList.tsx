import React from "react";
import styles from "./CardList.module.scss";
import IDataInvetment from "@/interfaces/dataInvestment";
import { useRouter } from "next/router";

interface ICardList {
  data: IDataInvetment[];
}
const CardList = ({ data }: ICardList) => {
  const router = useRouter();
  const handleOnclick = (investmentId: string) => {
    router.push({
      pathname: "/investments/investment",
      query: { investmentId: investmentId },
    });
  };
  return (
    <div className={styles.cardList}>
      <h1>Inversiones caducadas</h1>
      <div className={styles.contentCardList}>
        {data.map((item, key) => (
          <div key={key} className={styles.itemCardList}>
            <p>{key + 1}</p>
            <h1>{`${item.inversor.name} ${item.inversor.paternallastname} ${item.inversor.maternallastname}`}</h1>
            <span onClick={() => handleOnclick(item.investment.id)}>
              Revisar
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
