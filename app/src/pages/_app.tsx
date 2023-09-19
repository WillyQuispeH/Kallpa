import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { UiProvider } from "@/context/ui";
import type { AppProps } from "next/app";
import Template from "@/components/layout/Template";
import Login from "@/components/funtional/Login";
import useUser from "@/store/hooks/useUser";
import { useRouter } from "next/router";
import LoaderScreen from "@/components/ui/LoaderScreen/LoaderScreen";
import { useInvestment } from "@/store/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const { isLoadingInvestment } = useInvestment();

  return user.id !== "" ? (
    <UiProvider>
      <Template>
        <Component {...pageProps} />
        {isLoadingInvestment && <LoaderScreen />}
      </Template>
    </UiProvider>
  ) : (
    <Login />
  );
}
