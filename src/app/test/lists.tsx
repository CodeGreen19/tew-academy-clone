"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { createTask, deleteTask, getTasks } from "./action";

export default function Lists() {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  // 🔹 Create task
  const createMutation = useMutation({
    mutationFn: async () => {
      await createTask();
    },
    onSuccess: () => {
      toast.success("Task created");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to create task"),
  });

  // 🔹 Delete task
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteTask(id),
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to delete task"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border border-muted shadow-sm">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Task Manager</CardTitle>
          <Button
            size="sm"
            disabled={createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            {createMutation.isPending ? "Creating..." : "Create Task"}
          </Button>
        </CardHeader>

        <CardContent>
          {" "}
          {data.length > 0 ? (
            <ul className="space-y-2">
              {data.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between border border-muted rounded-md p-2 hover:bg-muted/50 transition"
                >
                  <span className="text-sm font-medium">{task.task}</span>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(task.id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-6">
              No tasks yet — click “Create Task”
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
