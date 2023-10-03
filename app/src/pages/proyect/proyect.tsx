import { useRouter } from "next/router";
import React, { useEffect } from "react";

import HeadPages from "@/components/layout/HeadPages";
import Proyect from "@/components/funtional/Proyect";
import useProyect from "@/store/hooks/useProyect";

const PageProyect = () => {
  const { getAllProyect, listProyect } = useProyect();
  const router = useRouter();

  useEffect(() => {
    if (listProyect.length === 0) {
      getAllProyect();
    }
  }, [router]);

  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <Proyect />
    </>
  );
};

export default PageProyect;
