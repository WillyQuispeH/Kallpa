import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Column } from "@/components/layout/Generic/Generic";
import Screen from "@/components/layout/Screen";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import Logo from "@/components/ui/Logo";

const Login = () => {
  const inicialForm = {
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  };

  const router = useRouter();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [form, setForm] = useState(inicialForm);

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnclickLogin = async () => {
    router.push("/welcome");
  };

  return (
    <Screen>
      <Column gap="65px">
        <Logo width="300px" height="205px" />
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
          <Button
            onClick={handleOnclickLogin}
            valor="Ingresar"
            width="200px"
            height="40px"
          />
          <Link valor="Olvidé mi contraseña" />
        </Column>
      </Column>
    </Screen>
  );
};

export default Login;
