import React, { useState, useEffect } from "react";
import styles from "./Proyect.module.scss";
import Input from "@/components/ui/Input";
import { Column, Row } from "@/components/layout/Generic";
import Table from "@/components/ui/Table";
import TableProyect from "@/components/ui/TableProyect";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import InputData from "@/components/ui/InputData";
import format from "date-fns/format";
import useProyect from "@/store/hooks/useProyect";
import { useRouter } from "next/router";

const Proyect = () => {
  const dataForm = {
    name: { value: "", isValid: true },
    date: { value: format(new Date(), "dd/MM/yyyy"), isValid: true },
    code: { value: "", isValid: true },
  };
  const [form, setForm] = useState(dataForm);
  const [isValidForm, setIsValidForm] = useState(false);
  const { createProyect, listProyect, isLoadingProyect, getAllProyect } =
    useProyect();
  const router = useRouter();

  const codeGeneric = (inputStr: string) => {
    let codigo = "";
    for (let i = 0; i < inputStr.length; i++) {
      codigo += inputStr[i] + i;
    }
    return codigo;
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
      code: {
        value: codeGeneric(e.target.value),
        isValid: form.code.value !== "" ? true : false,
      },
    });
  };

  const validateDataForm = (data: any) => {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const field = data[key];
        if (field.value === "" || !field.isValid) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    const isValidForm = validateDataForm(form);

    if (isValidForm) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form]);

  const handleOnClickSubmit = () => {
    if (isValidForm) {
      createProyect(form.name.value, form.code.value, form.date.value);
      getAllProyect();
    }
  };

  console.log(listProyect);
  return (
    <>
      <Seccion title="Lista de Proyectos">
        <div className={styles.proyect}>
          <Row gap="100px">
            <Column gap="10px">
              <Title value="Nuevo proyecto" width="325px" />
              <Row gap="5px">
                <Input
                  onChange={handleOnchange}
                  name="name"
                  value={form.name.value}
                  isValid={form.name.isValid}
                  label="Nombre del proyecto"
                  width="180px"
                />
                <InputData
                  width="140px"
                  label="Fecha"
                  value={form.date.value}
                />
              </Row>
              <InputData width="180px" label="Codigo" value={form.code.value} />
            </Column>

            <Column gap="10px">
              <Title value="Lista de proyectos" width="651px" />
              <TableProyect data={listProyect} />
            </Column>
          </Row>
        </div>
      </Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Registrar"
          width="200px"
          height="50px"
          disabled={!isValidForm}
          isLoading={isLoadingProyect}
        />
      </SeccionFooter>
    </>
  );
};

export default Proyect;
