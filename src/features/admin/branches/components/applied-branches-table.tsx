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
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { useRef } from "react";
import { toast } from "sonner";
import { applyBranchChangeStatus, deleteApplyBranchRecord } from "../actions";
import AppliedBranchesPreview from "./applied-branches-preview";
import { Badge } from "@/components/ui/badge";
import { applyBranches } from "@/drizzle/schema";
import { cn } from "@/lib/utils";

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
    accessorKey: "status",

    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={cn(status === "canceled" && "text-destructive/80")}
          variant={status === "approved" ? "default" : "outline"}
        >
          {row.original.status}
        </Badge>
      );
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
          title: "Status",
          job: {
            show: "plain",
            component: (
              <ChangeStatus id={row.original.id} status={row.original.status} />
            ),
          },
        },
      ];
      row.original.status !== "approved" &&
        actionItems.push({
          title: "Delete Record",
          job: {
            show: "dialog",
            component: <DeleteRecord id={row.original.id} />,
          },
          className: "text-red-500",
        });
      return <DataTableActionDropdown items={actionItems} />;
    },
  },
];

function ChangeStatus({
  id,
  status,
}: {
  status: (typeof applyBranches.status.enumValues)[number];
  id: string;
}) {
  const qc = getQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      selectState: (typeof applyBranches.status.enumValues)[number]
    ) => applyBranchChangeStatus({ id, status: selectState }),
    onSuccess: ({ message, success }) => {
      if (success) toast.success(message);
      qc.invalidateQueries({ queryKey: ["apply-branch"] });
    },
  });
  return status === "pending" ? (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem disabled>Pending</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mutate("approved")}
            variant="default"
          >
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => mutate("canceled")}
            variant="destructive"
          >
            Cancel
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  ) : (
    <DropdownMenuItem disabled>{status}</DropdownMenuItem>
  );
}

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
