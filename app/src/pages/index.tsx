import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Welcome from "@/components/funtional/Welcome/Welcome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Kallpa</title>
        <meta name="description" content="Administrador Kallpa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/app.png" />
      </Head>
      <Welcome />
    </>
  );
}
