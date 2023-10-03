import React from "react";

import HeadPages from "@/components/layout/HeadPages";
import Login from "@/components/funtional/Login";

const PageLogin = () => {
  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <Login />
    </>
  );
};

export default PageLogin;
