import { setInterval } from "timers";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getRandomNumbers } from "../utils/utils";
import { Table } from "./types";

interface TableStore {
  tables: Record<string, Table>;
  tableIds: string[];
  intervalTick: number;
  setTables: (tables: Record<string, Table>) => void;
  updateTables: (ids: string[]) => void;
  updateAllTables: () => void;
  addTables: (tables: Record<string, Table>) => void;
  removeTable: (id: string) => void;
  subscribeToTableEvents: () => () => void;
  getRandomTableId: () => string;
}

const INITIAL_STATE = {
  tables: {},
  tableIds: [],
  intervalTick: 0,
};

const tableMonitoringStore = create(
  immer<TableStore>((set, get) => ({
    ...INITIAL_STATE,
    setTables: (tables) =>
      set(() => {
        return {
          tables,
          tableIds: Object.keys(tables),
          displayedTableIds: Object.keys(tables),
        };
      }),
    updateAllTables: () =>
      set((state) => {
        state.tableIds.forEach((id) => {
          state.tables[id] = {
            ...state.tables[id],
            warning: !state.tables[id].warning,
            guests: Math.floor(Math.random() * 6),
          };
        });
      }),
    updateTables: (ids) =>
      set((state) => {
        ids.forEach((id) => {
          state.tables[id] = {
            ...state.tables[id],
            warning: !state.tables[id].warning,
            guests: Math.floor(Math.random() * 6),
          };
        });
      }),
    addTables: (tables) =>
      set((state) => ({
        tables: { ...state.tables, ...tables },
        tableIds: [...state.tableIds, ...Object.keys(tables)],
      })),
    removeTable: (id) =>
      set((state) => {
        delete state.tables[id];
        state.tableIds = state.tableIds.filter((tableId) => tableId !== id);
      }),
    getRandomTableId: () => {
      return get().tableIds[Math.floor(Math.random() * get().tableIds.length)];
    },
    subscribeToTableEvents: () => {
      const interval = setInterval(() => {
        if (get().intervalTick == 1) {
          set(() => ({ intervalTick: 0 }));
          get().updateAllTables();
        } else {
          set(() => ({ intervalTick: 1 }));
          const numbers = getRandomNumbers(get().tableIds);

          get().updateTables(numbers);
        }
      }, 2000);

      return () => clearInterval(interval);
    },
  }))
);

export default tableMonitoringStore;
