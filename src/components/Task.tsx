import type React from "react"
import type { TaskT } from "types/task"
import { TrashIcon } from "lucide-react"
import { Button } from "./ui/button"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Checkbox } from "./ui/checkbox"

const Task: React.FC<{ task: TaskT; getTasks: () => Promise<void> }> = ({
  task,
  getTasks,
}) => {
  return (
    <div className="flex border-2 border-red-300 p-2 rounded-md items-center gap-2">
      <span
        className={cn("grow break-all", {
          "line-through": task.isCompleted,
        })}
      >
        {task.description}
      </span>

      <div className="flex items-center gap-2">
        <Checkbox
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          checked={task.isCompleted}
          onClick={() => {
            axios
              .put(`http://localhost:5228/api/tasks/${task.id}`, {
                isCompleted: !task.isCompleted,
              })
              .then(() => getTasks())
              .catch(console.log)
          }}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            axios
              .delete(`http://localhost:5228/api/tasks/${task.id}`)
              .then(() => getTasks())
              .catch(console.log)
          }
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  )
}

export default Task
