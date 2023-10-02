import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { UiProvider } from "@/context/ui";
import type { AppProps } from "next/app";
import Template from "@/components/layout/Template";
import Login from "@/components/funtional/Login";
import useUser from "@/store/hooks/useUser";
import LoaderScreen from "@/components/ui/LoaderScreen/LoaderScreen";
import { useInvestment } from "@/store/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const { isLoadingInvestment } = useInvestment();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {user.id !== "" ? (
        <UiProvider>
          <Template>
            <Component {...pageProps} />
            {isLoadingInvestment && <LoaderScreen />}
          </Template>
        </UiProvider>
      ) : (
        <Login />
      )}
    </QueryClientProvider>
  );
}
