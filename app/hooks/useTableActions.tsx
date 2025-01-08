import { useCallback, useEffect } from "react";
import { v4 as uuid } from "uuid";
import useTableStore from "../store/tableMonitoring.store";
import { Table, TableType } from "../store/types";

const TABLE_TYPES = [
  TableType.DINING,
  TableType.BOOTH,
  TableType.OUTDOOR,
  TableType.PRIVATE,
];

const generateMockData = (num: number): Record<string, Table> => {
  const tables: Record<string, Table> = {};
  for (let id = 1; id <= num; id++) {
    const uniqueId = uuid();
    const tableId = `table-${uniqueId}`;
    tables[tableId] = {
      id: tableId,
      type: TABLE_TYPES[Math.floor(Math.random() * TABLE_TYPES.length)],
      name: `Table ${uniqueId}`,
      warning: Math.random() < 0.1,
      guests: Math.floor(Math.random() * 6),
      maxGuests: 6,
    };
  }
  return tables;
};

const BASE_MOCKED_TABLES_COUNT = 10;

export const useTableActions = (): {
  addTables: (tableCount: number) => void;
} => {
  const setTables = useTableStore((state) => state.setTables);
  const addTables = useTableStore((state) => state.addTables);
  const subscribeToTableEvents = useTableStore(
    (state) => state.subscribeToTableEvents
  );

  useEffect(() => {
    const tables = generateMockData(BASE_MOCKED_TABLES_COUNT);
    setTables(tables);
  }, [setTables]);

  useEffect(() => {
    const unsubscribe = subscribeToTableEvents();

    return () => unsubscribe();
  }, [subscribeToTableEvents]);

  const handleAddTable = useCallback(
    (tableCount: number) => {
      const tables = generateMockData(tableCount);
      addTables(tables);
    },
    [addTables]
  );

  return { addTables: handleAddTable };
};
