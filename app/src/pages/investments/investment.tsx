import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Investment from "@/components/funtional/Investment";
import useInvestment from "@/store/hooks/useInvestment";
import HeadPages from "@/components/layout/HeadPages";

const PageInvestment = () => {
  const router = useRouter();
  const { getByIdInvestment } = useInvestment();
  const { investmentId } = router.query;

  useEffect(() => {
    if (investmentId) {
      getByIdInvestment(investmentId.toString());
    }
  }, [router]);

  if (!investmentId) return null;

  if (router.isReady) {
    return (
      <>
        <HeadPages
          title="Kallpa"
          description="Administrador Gaman"
        />
        <Investment />
      </>
    );
  }
};

export default PageInvestment;
