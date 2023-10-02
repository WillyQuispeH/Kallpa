import React, { useState, useEffect } from "react";
import styles from "./Search.module.scss";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import { Column, Row } from "@/components/layout/Generic";
import Input from "@/components/ui/Input";
import Title from "@/components/ui/Title";
import Button from "@/components/ui/Button";
import { useInvestment } from "@/store/hooks";
import Table from "@/components/ui/Table";
import { useRouter } from "next/router";

const Search = () => {
  const [form, setForm] = useState({ dni: { value: "", isValid: true } });
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const router = useRouter();
  const { getByDniInvestment, investmentList } = useInvestment();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      dni: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  useEffect(() => {
    if ((form.dni.value !== "", form.dni.isValid)) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form]);

  const handleOnClickSubmit = () => {
    getByDniInvestment(form.dni.value);
  };

  return (
    <>
      <Seccion title="Buscar Inversión por DNI">
        <div className={styles.proyect}>
          <div className={styles.contentData}>
            <Column gap="10px">
              <Title value="Ingrese el DNI" width="200px" />
              <Row gap="5px">
                <Input
                  onChange={handleOnChange}
                  name="dni"
                  value={form.dni.value}
                  isValid={form.dni.isValid}
                  label="DNI"
                  width="200px"
                />
              </Row>
            </Column>
            <Column gap="5px">
              <div className={styles.modeMovil}>
                <Title value="Lista de inversiones" width="350px" />
              </div>
              <div className={styles.modePortal}>
                <Title value="Lista de inversiones" width="900px" />
              </div>
              <div className={styles.contentTable}>
                <Table data={investmentList} />
              </div>
            </Column>
          </div>
        </div>
      </Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Buscar"
          width="200px"
          height="50px"
          disabled={!isValidForm}
          isLoading={false}
        />
      </SeccionFooter>
    </>
  );
};

export default Search;
