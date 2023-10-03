import React from "react";

import HeadPages from "@/components/layout/HeadPages";
import Search from "@/components/funtional/Search";

const PageSearch = () => {
  return (
    <>
      <HeadPages title="Kallpa" description="Administrador Gaman" />
      <Search />
    </>
  );
};

export default PageSearch;
