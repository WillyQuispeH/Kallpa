import Table from "@/components/ui/Table/Table";
import IDataInvetment from "@/interfaces/dataInvestment";
import React from "react";

const Current = ({ data }: { data: IDataInvetment[] }) => {
  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Current;
