import React, { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./Seccion.module.scss";
import { useRouter } from "next/router";
import { useInvestment } from "@/store/hooks";
import { Modal, ModalBody, ModalTitle, Overlay } from "@/components/ui/Modal";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { Row } from "../Generic";

interface ISeccion {
  children: any;
  title?: string;
  titleRight?: string;
}

const SeccionFooter = ({ children }: any) => {
  return <div className={styles.footerSeccion}>{children}</div>;
};

const Seccion = ({ children, title, titleRight }: ISeccion) => {
  const router = useRouter();
  const { investmentId } = router.query;
  const { updateStateInvestment, investment } = useInvestment();
  const [modal, setModal] = useState(false);
  const { investment: dataIn } = investment;
  const state = dataIn?.state;

  const handleOnclickDeneg = async () => {
    setModal(false);
  };

  const handleOnclickAcept = async () => {
    updateStateInvestment(investmentId as string, "Terminado");
    router.push("/investments/welcome");
  };

  return (
    <>
      <div className={styles.seccion}>
        {title && (
          <h1
            className={styles.headerSeccion}
            style={{
              justifyContent: titleRight ? "space-between" : "center",
            }}
          >
            {title}
            {state !== "Terminado" &&
              router.pathname === "/investments/investment" && (
                <Button
                  valor="Terminar"
                  onClick={() => setModal(true)}
                  width="150px"
                  height="50px"
                  bg="#500404"
                />
              )}
          </h1>
        )}
        {children}
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
                onClick={handleOnclickAcept}
                isLoading={false}
              />

              <Button
                width="150px"
                valor="Cancelar"
                height="50px"
                onClick={handleOnclickDeneg}
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

export { Seccion, SeccionFooter };
