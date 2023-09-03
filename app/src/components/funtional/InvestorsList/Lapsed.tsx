import Table from "@/components/ui/Table";
import IDataInvetment from "@/interfaces/dataInvestment";
import React from "react";

const Lapsed = ({ data }: { data: IDataInvetment[] }) => {
  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Lapsed;
