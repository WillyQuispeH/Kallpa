import React from "react";
import styles from "./TableProyect.module.scss";
import IDataInvetment from "@/interfaces/dataInvestment";

interface IProyect {
  name: string;
  id: string;
  code: string;
  date: string;
}

const TableProyect = ({ data }: { data: IProyect[] }) => {
  const headTable = [
    {
      width: "40px",
      value: "#",
    },
    {
      width: "150px",
      value: "Fecha",
    },
    {
      width: "200px",
      value: "Nombre",
    },
    {
      width: "150px",
      value: "Codigo",
    },
    {
      width: "50px",
      value: "Acción",
    },
    {
      width: "50px",
      value: "Acción",
    },
  ];

  const handleOnclickDetail = (id: string) => {};
  return (
    <div className={styles.tableProyect}>
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
              <td style={{ width: "150px" }}> {item.date} </td>
              <td style={{ width: "200px" }}>{item.name}</td>
              <td style={{ width: "150px" }}>{item.code}</td>

              <td
                style={{ width: "50px" }}
                onClick={() => handleOnclickDetail(item.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </td>
              <td
                style={{ width: "50px" }}
                onClick={() => handleOnclickDetail(item.id)}
              >
                <span className="material-symbols-outlined">edit</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProyect;
