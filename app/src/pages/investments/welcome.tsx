import Welcome from "@/components/funtional/Welcome/Welcome";
import useInvestment from "@/store/hooks/useInvestment";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

const PageWelcome = () => {
  const router = useRouter();
  const { getAllInvestment } = useInvestment();
  useEffect(() => {
    getAllInvestment();
  }, [router]);

  return <Welcome />;
};

export default PageWelcome;
