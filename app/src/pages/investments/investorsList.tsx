import { useRouter } from "next/router";
import React, { useEffect } from "react";
import HeadPages from "@/components/layout/HeadPages";
import InvestorsList from "@/components/funtional/InvestorsList";
import useInvestment from "@/store/hooks/useInvestment";

const PageInvestorsList = () => {
  const { getAllInvestment } = useInvestment();
  const router = useRouter();

  useEffect(() => {
    getAllInvestment();
  }, [router]);

  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <InvestorsList />
    </>
  );
};

export default PageInvestorsList;
