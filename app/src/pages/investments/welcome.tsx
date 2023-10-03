import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Welcome from "@/components/funtional/Welcome/Welcome";
import useInvestment from "@/store/hooks/useInvestment";
import HeadPages from "@/components/layout/HeadPages";

const PageWelcome = () => {
  const router = useRouter();
  const { getAllInvestment } = useInvestment();
  useEffect(() => {
    getAllInvestment();
  }, [router]);

  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <Welcome />
    </>
  );
};

export default PageWelcome;
