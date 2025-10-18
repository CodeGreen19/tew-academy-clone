"use client";

import { DataTable } from "@/components/table/data-table";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { getAllAppliedBranches } from "../queries";

import DataTableActionDropdown, {
  DataTableActionDropdownItem,
} from "@/components/table/data-table-action-dropdown";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  CheckBoxCell,
  CheckBoxHeader,
} from "@/components/table/data-table-select-checkbox";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { useRef } from "react";
import { toast } from "sonner";
import { deleteApplyBranchRecord } from "../actions";
import AppliedBranchesPreview from "./applied-branches-preview";

type AppliedBranchType = Awaited<
  ReturnType<typeof getAllAppliedBranches>
>[number];
export const columns: ColumnDef<AppliedBranchType>[] = [
  {
    id: "select",
    header: ({ table }) => <CheckBoxHeader table={table} />,
    cell: ({ row }) => <CheckBoxCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "institutionName",

    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Institution Name" />;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Address" />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const actionItems: DataTableActionDropdownItem[] = [
        {
          title: "Preview",
          job: {
            show: "dialog",
            component: <AppliedBranchesPreview id={row.original.id} />,
          },
        },
        {
          title: "Delete Record",
          job: {
            show: "dialog",
            component: <DeleteRecord id={row.original.id} />,
          },
          className: "text-red-500",
        },
      ];
      return <DataTableActionDropdown items={actionItems} />;
    },
  },
];

function DeleteRecord({ id }: { id: string }) {
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = getQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteApplyBranchRecord(id),
    onSuccess: ({ message, success }) => {
      if (success) toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["apply-branch"] });
      deleteRef.current?.click();
    },
  });
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Are you sure ?</h1>
      <h3 className="text-muted-foreground text-sm">
        NB: this action can&apos;t be undone. This will delete all the
        associated info also.
      </h3>
      <Button
        onClick={() => {
          mutate();
        }}
        variant={"destructive"}
      >
        <LoadingSwap isLoading={isPending}>Delete Record</LoadingSwap>
      </Button>
      <DialogClose ref={deleteRef} />
    </div>
  );
}

export default function AppliedBranchesTable() {
  const { data } = useSuspenseQuery({
    queryFn: () => getAllAppliedBranches(),
    queryKey: ["apply-branch"],
  });
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
