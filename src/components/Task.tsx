import type React from "react"
import type { TaskT } from "types/task"
import { TrashIcon, CheckIcon } from "lucide-react"
import { Toggle } from "./ui/toggle"
import { Button } from "./ui/button"
import axios from "axios"
import { cn } from "@/lib/utils"

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

        <Toggle
          pressed={task.isCompleted}
          onClick={() => {
            axios
              .put(`http://localhost:5228/api/tasks/${task.id}`, {
                isCompleted: !task.isCompleted,
              })
              .then(() => getTasks())
              .catch(console.log)
          }}
          size="sm"
        >
          <CheckIcon />
        </Toggle>
      </div>
    </div>
  )
}

export default Task
