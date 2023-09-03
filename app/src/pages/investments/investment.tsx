import Investment from "@/components/funtional/Investment";
import useInvestment from "@/store/hooks/useInvestment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
    return <Investment />;
  }
};

export default PageInvestment;
