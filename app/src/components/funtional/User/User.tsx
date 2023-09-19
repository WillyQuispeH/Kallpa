import React, { useState, useEffect } from "react";
import styles from "./User.module.scss";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";
import CardUser from "@/components/ui/CardUser";
import { Row, Column } from "@/components/layout/Generic";
import Title from "@/components/ui/Title";
import Input from "@/components/ui/Input";
import ClaimType from "@/components/ui/ClaimType";
import { usePerson, useUser } from "@/store/hooks";
import { isValidEmail, isValidPhone } from "@/utils/validate";
import InputData from "@/components/ui/InputData";
import ListUser from "@/components/ui/ListUser";
import { useRouter } from "next/router";

const User = () => {
  const dataForm = {
    dni: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternallastname: { value: "", isValid: true },
    maternallastname: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    address: { value: "", isValid: true },
    email: { value: "", isValid: true },
  };
  const [form, setForm] = useState(dataForm);
  const { isLoadingPerson, createPerson } = usePerson();
  const [isValidForm, setIsValidForm] = useState(false);
  const { user, listUser } = useUser();
  const router = useRouter();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: isValidEmail(e.target.value),
      },
    });
  };

  const handleOnchangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: isValidPhone(e.target.value),
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
    if (user.id !== "") {
      setForm({
        dni: { value: user.dni, isValid: true },
        name: { value: user.name, isValid: true },
        paternallastname: { value: user.paternallastname, isValid: true },
        maternallastname: { value: user.maternallastname, isValid: true },
        phone: { value: user.phone, isValid: true },
        address: { value: user.address, isValid: true },
        email: { value: user.email, isValid: true },
      });
    }
  }, [user]);

  useEffect(() => {
    const isValidForm = validateDataForm(form);

    if (isValidForm) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form]);

  const handleOnClickSubmit = async () => {
    if (isValidForm) {
      createPerson(
        form.dni.value,
        form.name.value,
        form.paternallastname.value,
        form.maternallastname.value,
        form.address.value,
        form.email.value,
        form.phone.value
      );
    }
    setTimeout(() => {
      router.push("/investments/welcome");
    }, 3000);
  };

  return (
    <>
      <Seccion title="Usuario">
        <Row gap="100px">
          <CardUser
            email={user.email}
            alias={user.status}
            name={`${user.name} ${user.paternallastname} ${user.maternallastname}`}
          />
          <Column gap="5px">
            <Title value="Datos del usuario" width="305px" />
            <Row gap="5px">
              <InputData width="200px" value={form.dni.value} label="DNI" />
              <ClaimType width="100px" isLoading={false} />
            </Row>
            <Input
              label="Nombre"
              type="text"
              name="name"
              width="305px"
              value={form.name.value}
              onChange={handleOnchange}
              isValid={form.name.isValid}
            />
            <Input
              label="Apellido paterno"
              type="text"
              name="paternallastname"
              width="305px"
              value={form.paternallastname.value}
              onChange={handleOnchange}
              isValid={form.paternallastname.isValid}
            />
            <Input
              label="Apellido materno"
              type="text"
              name="maternallastname"
              width="305px"
              value={form.maternallastname.value}
              onChange={handleOnchange}
              isValid={form.maternallastname.isValid}
            />
            <Input
              label="Dirección"
              type="text"
              name="address"
              width="305px"
              value={form.address.value}
              onChange={handleOnchange}
              isValid={form.address.isValid}
            />
            <Input
              label="Correo electronico"
              type="text"
              name="email"
              width="305px"
              value={form.email.value}
              onChange={handleOnchangeEmail}
              isValid={form.email.isValid}
            />
            <Input
              label="Teléfono"
              type="number"
              name="phone"
              width="180px"
              value={form.phone.value}
              onChange={handleOnchangePhone}
              isValid={form.phone.isValid}
            />
          </Column>
          <Column gap="5px">
            <Title value="Lista de usuarios" width="350px" />
            <ListUser data={listUser} />
          </Column>
        </Row>
      </Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Guardar cambios"
          width="200px"
          height="50px"
          disabled={!isValidForm}
          isLoading={isLoadingPerson}
        />
      </SeccionFooter>
    </>
  );
};

export default User;
