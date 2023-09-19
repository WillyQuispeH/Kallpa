import React, { useState } from "react";
import styles from "./TableProyect.module.scss";
import { Overlay, Modal, ModalBody, ModalTitle } from "../Modal";
import { useProyect } from "@/store/hooks";
import ButtonIcon from "../ButtonIcon";
import { Row } from "@/components/layout/Generic";
import Button from "../Button";

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
  ];

  const { removeProyect } = useProyect();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");

  const handleOnclickDelete = async () => {
    removeProyect(id);
    setModal(false);
  };

  return (
    <>
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
                    idx % 2 === 0
                      ? "rgb(0, 46, 57, 0.1)"
                      : "rgb(0, 46, 57, 0.2)",
                }}
              >
                <td style={{ width: "40px" }}>{idx + 1}</td>
                <td style={{ width: "150px" }}> {item.date} </td>
                <td style={{ width: "200px" }}>{item.name}</td>
                <td style={{ width: "150px" }}>{item.code}</td>

                <td
                  style={{ width: "50px" }}
                  onClick={() => {
                    setId(item.id);
                    setModal(true);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Overlay active={modal}>
        <Modal>
          <ModalTitle title="¿Estas seguro?">
            <ButtonIcon
              typeButton="square"
              icon="close"
              onClick={() => setModal(false)}
            />
          </ModalTitle>
          <ModalBody>
            <Row gap="10px">
              <Button
                width="150px"
                valor="Aceptar"
                height="50px"
                onClick={handleOnclickDelete}
                isLoading={false}
              />

              <Button
                width="150px"
                valor="Cancelar"
                height="50px"
                onClick={() => setModal(false)}
                isLoading={false}
                bg="#500404"
              />
            </Row>
          </ModalBody>
        </Modal>
      </Overlay>
    </>
  );
};

export default TableProyect;
