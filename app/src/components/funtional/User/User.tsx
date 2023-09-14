import React from "react";
import styles from "./User.module.scss";
import { Seccion, SeccionFooter } from "@/components/layout/Seccion";
import Button from "@/components/ui/Button";

const User = () => {
  const handleOnClickSubmit = () => {};
  return (
    <>
      <Seccion title="Usuario">mi mundo</Seccion>
      <SeccionFooter>
        <Button
          onClick={handleOnClickSubmit}
          valor="Registrar"
          width="200px"
          height="50px"
          disabled={true}
          isLoading={false}
        />
      </SeccionFooter>
    </>
  );
};

export default User;
