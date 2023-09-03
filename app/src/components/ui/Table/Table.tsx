import React from "react";
import styles from "./Table.module.scss";
import { useRouter } from "next/router";
import { format } from "date-fns";
import IDataInvetment from "@/interfaces/dataInvestment";

const Table = ({ data }: { data: IDataInvetment[] }) => {
  const headTable = [
    {
      width: "40px",
      value: "#",
    },
    {
      width: "250px",
      value: "Nombre",
    },
    {
      width: "200px",
      value: "Monto de inversión",
    },
    {
      width: "200px",
      value: "Mes de pago",
    },
    {
      width: "150px",
      value: "N° Archivos",
    },
    {
      width: "50px",
      value: "Ver",
    },
  ];
  const router = useRouter();
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  const handleOnclickDetail = (investmentId: string) => {
    router.push({
      pathname: "/investments/investment",
      query: { investmentId: investmentId },
    });
  };

  return (
    <div className={styles.tableClaimMain}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headTable.map((item, key) => (
              <th key={key} style={{ width: item.width }}>
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx: any) => (
            <tr
              key={idx}
              style={{
                background:
                  idx % 2 === 0 ? "rgb(0, 46, 57, 0.1)" : "rgb(0, 46, 57, 0.2)",
              }}
            >
              <td style={{ width: "40px" }}>{idx + 1}</td>
              <td style={{ width: "250px" }}>
                {`${item.inversor?.name} ${item.inversor?.paternallastname} ${item.inversor?.maternallastname}`}
              </td>
              <td style={{ width: "200px" }}>
                {formatter.format(parseFloat(item.investment.amount))}
              </td>
              <td style={{ width: "200px" }}>{item.investment.monthpay}</td>
              <td style={{ width: "150px" }}>{item.investment.monthpay}</td>

              <td
                style={{ width: "50px" }}
                onClick={() => handleOnclickDetail(item.investment.id)}
              >
                <span className="material-symbols-outlined">frame_inspect</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
