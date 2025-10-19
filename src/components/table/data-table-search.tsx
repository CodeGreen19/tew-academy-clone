import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  //   searchByText: string;
}

export function DataTableSearch<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="relative">
      <Search className="absolute size-4 left-2.5 top-2.5" />
      <Input
        placeholder="Search here..."
        value={
          (table.getColumn("institutionName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("institutionName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm pl-8"
      />
    </div>
  );
}
