import React, { useEffect } from "react";
import { useUser } from "@/store/hooks";

import User from "@/components/funtional/User";
import HeadPages from "@/components/layout/HeadPages";

const PageUser = () => {
  const { getAllUser, listUser } = useUser();

  useEffect(() => {
    if (listUser.length === 0) {
      getAllUser();
    }
  }, []);

  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <User />
    </>
  );
};

export default PageUser;
