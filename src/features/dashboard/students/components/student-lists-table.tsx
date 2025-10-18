"use client";

import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { deleteStudent } from "../actions";
import { getStudentLists } from "../queries";

export function StudentListsTable() {
  const { data: lists } = useSuspenseQuery({
    queryKey: ["students"],
    queryFn: () => getStudentLists(),
  });

  return (
    <div className="space-y-2">
      {lists.map((item) => (
        <div key={item.id} className="grid grid-cols-2">
          <h2>{item.name}</h2>
          <DeleteButton id={item.id} />
        </div>
      ))}
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  const qc = getQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteStudent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return (
    <Button disabled={isPending} onClick={() => mutate()}>
      <Trash />
    </Button>
  );
}
