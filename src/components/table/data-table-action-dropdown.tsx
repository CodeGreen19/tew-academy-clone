"use client";

import { Fragment, JSX, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

export type DataTableActionDropdownItem = {
  title: string;
  job: {
    show: "dialog" | "sheet" | "plain";
    component: JSX.Element;
  };
  className?: string;
};

type Props = {
  items: DataTableActionDropdownItem[];
};

export default function DataTableActionDropdown({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [activeComponent, setActiveComponent] = useState<JSX.Element | null>(
    null
  );

  const handleClick = (item: DataTableActionDropdownItem) => {
    if (item.job.show === "dialog") {
      setActiveComponent(item.job.component);
      setOpenDialog(true);
    } else if (item.job.show === "sheet") {
      setActiveComponent(item.job.component);
      setOpenSheet(true);
    }
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {items.map((item, index) =>
            item.job.show === "plain" ? (
              <Fragment key={item.title}>{item.job.component}</Fragment>
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  handleClick(item);
                }}
                className={item.className}
              >
                {item.title}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTitle></DialogTitle>
        <DialogContent>{activeComponent}</DialogContent>
      </Dialog>

      {/* Sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <DialogTitle></DialogTitle>
        <SheetContent>{activeComponent}</SheetContent>
      </Sheet>
    </div>
  );
}
