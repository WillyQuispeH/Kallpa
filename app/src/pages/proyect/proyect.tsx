import Proyect from "@/components/funtional/Proyect";
import useProyect from "@/store/hooks/useProyect";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PageProyect = () => {
  const { getAllProyect, listProyect } = useProyect();
  const router = useRouter();
  
  useEffect(() => {
    if (listProyect.length === 0) {
      getAllProyect();
    }
  }, [router]);

  return <Proyect />;
};

export default PageProyect;
