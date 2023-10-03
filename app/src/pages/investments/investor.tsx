import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Investor from "@/components/funtional/Investor";
import useProyect from "@/store/hooks/useProyect";
import HeadPages from "@/components/layout/HeadPages";

const PageInvestor = () => {
  const { getAllProyect } = useProyect();
  const router = useRouter();

  if (router.isReady)
    return (
      <>
        <HeadPages title="Kallpa" description="Administrador Gaman" />
        <Investor />
      </>
    );
};

export default PageInvestor;
