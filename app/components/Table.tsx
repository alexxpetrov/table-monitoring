import boothTable from "@public/images/table-booth.webp";
import diningTable from "@public/images/table-dining.webp";
import outdoorTable from "@public/images/table-outdoor.webp";
import privateTable from "@public/images/table-private.webp";
import Image, { StaticImageData } from "next/image";
import { useCallback } from "react";
import { Table as TableType } from "../store/types";
import useTableStore from "../store/useTableStore";

interface TableProps {
  id: string;
}

const tableImages: Record<TableType["type"], StaticImageData> = {
  "Dining Table": diningTable,
  "Booth Table": boothTable,
  "Outdoor Table": outdoorTable,
  "Private Dining Table": privateTable,
};

export const Table: React.FC<TableProps> = ({ id }) => {
  const table = useTableStore((state) => state.tables[id]);
  const removeTable = useTableStore((state) => state.removeTable);
  const tableStyle: React.CSSProperties = {
    boxShadow: table.warning ? "0 0 10px 5px rgb(216, 134, 40)" : "none",
    animation: table.warning ? "blink 1s infinite" : "none",
  };

  const handleRemoveTable = useCallback(() => {
    removeTable(id);
  }, [removeTable, id]);

  return (
    <div
      className="table-container flex flex-col items-start"
      style={tableStyle}
    >
      <div className="flex items-start w-full">
        <Image
          src={tableImages[table.type]}
          alt={table.type}
          className="table-image"
          width={200}
          height={200}
        />
        <button onClick={handleRemoveTable} className="ml-auto text-red-500">
          X
        </button>
      </div>

      <h3 className="table-name">Type: {table.type}</h3>

      <h3 className="table-name">ID: {table.id}</h3>
      <h3 className="table-name">Name: {table.name}</h3>
      <p className="table-guests">{`Guests: ${table.guests} / ${table.maxGuests}`}</p>
    </div>
  );
};
