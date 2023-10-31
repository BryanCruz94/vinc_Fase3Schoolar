/* eslint-disable react/jsx-filename-extension */
import Head from "next/head";
import React, { FC } from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";


interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <div className="relative">
        <Head>
          <title>{title || "Schoolar Security"}</title>
          <meta name="author" content="Vinicio Borja y Maria Parraga" />
          <meta
            name="description"
            content={`Información sobre Seguridad ESPE ${title}`}
          />
          <meta name="keywords" content={`${title}, Seguridad, ESPE`} />
          <link rel="icon" href="/schoolarSecurity/favicon.ico" type="image/x-icon" />

        </Head>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
