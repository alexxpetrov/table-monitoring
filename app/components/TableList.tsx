import { memo } from "react";
import useTableStore from "../store/useTableStore";
import { Table } from "./Table";

export const TableList = memo(() => {
  const tableIds = useTableStore((state) => state.tableIds);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {tableIds.map((tableId) => (
        <Table key={tableId} id={tableId} />
      ))}
    </div>
  );
});
