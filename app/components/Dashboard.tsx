"use client";
import React from "react";
import { useTableActions } from "../hooks/useTableActions";
import { TableList } from "./TableList";

const Dashboard: React.FC = () => {
  const { addTables } = useTableActions();
  return (
    <div className="p-4">
      <button
        onClick={() => addTables(100)}
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Tables (100)
      </button>
      <button
        onClick={() => addTables(5)}
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Tables (5)
      </button>
      <button
        onClick={() => addTables(1)}
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add a single table
      </button>
      <TableList />
    </div>
  );
};

export default Dashboard;
