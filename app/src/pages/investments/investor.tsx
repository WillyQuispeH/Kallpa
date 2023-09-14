import Investor from "@/components/funtional/Investor";
import useProyect from "@/store/hooks/useProyect";
import { ro } from "date-fns/locale";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PageInvestor = () => {
  const { getAllProyect } = useProyect();
  const router = useRouter();

  useEffect(() => {
    if (2 === 2) {
      getAllProyect();
    }
  }, [router]);

  if (router.isReady) return <Investor />;
};

export default PageInvestor;
