import InvestorsList from "@/components/funtional/InvestorsList";
import useInvestment from "@/store/hooks/useInvestment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PageInvestorsList = () => {
  const { getAllInvestment } = useInvestment();
  const router = useRouter();
  
  useEffect(() => {
    getAllInvestment();
  }, [router]);

  return <InvestorsList />;
};

export default PageInvestorsList;
