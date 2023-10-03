import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Column } from "@/components/layout/Generic/Generic";
import Screen from "@/components/layout/Screen";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import { useUser } from "@/store/hooks";

import styles from "./Login.module.scss";

const Login = () => {
  
  const inicialForm = {
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };

  const router = useRouter();
  const [isValidForm, setIsValidForm] = useState(false);
  const [form, setForm] = useState(inicialForm);
  const { validateUser, isLoadingUser } = useUser();

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  useEffect(() => {
    if (
      form.password.isValid &&
      form.password.value !== "" &&
      form.email.isValid &&
      form.password.value !== ""
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form]);

  const handleOnclickLogin = async () => {
    if (isValidForm) {
      validateUser(form.email.value, form.password.value);
      router.push("/investments/welcome");
    }
  };

  return (
    <Screen>
      <Column gap="30px">
        <div className={styles.logoLogin}>
          <Logo width="250px" height="155px" />
        </div>
        <Column gap="28px">
          <Column gap="5px">
            <InputText
              label="Correo electrónico"
              type="email"
              name="email"
              width="300px"
              value={form.email.value}
              onChange={handleOnchange}
              isValid={form.email.isValid}
            />
            <InputText
              label="Contraseña"
              type="password"
              width="300px"
              name="password"
              value={form.password.value}
              onChange={handleOnchange}
              isValid={form.password.isValid}
            />
          </Column>
          <div className={styles.buttonLogin}>
            <Button
              onClick={handleOnclickLogin}
              valor="Ingresar"
              width="180px"
              height="40px"
              isLoading={isLoadingUser}
              disabled={!isValidForm}
            />
          </div>
        </Column>
        <div className={styles.developer}>
          <img src="/developer.png" alt="gaman/Company" />
        </div>
      </Column>
    </Screen>
  );
};

export default Login;
