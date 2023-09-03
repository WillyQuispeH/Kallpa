import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { UiProvider } from "@/context/ui";
import type { AppProps } from "next/app";
import Template from "@/components/layout/Template";
import Login from "@/components/funtional/Login";

export default function App({ Component, pageProps }: AppProps) {
  const [isUser, setIsUser] = useState(true);

  return isUser ? (
    <UiProvider>
      <Template>
        <Component {...pageProps} />
      </Template>
    </UiProvider>
  ) : (
    <Login />
  );
}
