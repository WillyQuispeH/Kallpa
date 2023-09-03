import Table from "@/components/ui/Table";
import IDataInvetment from "@/interfaces/dataInvestment";
import React from "react";

const Finished = ({ data }: { data: IDataInvetment[] }) => {
  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Finished;
