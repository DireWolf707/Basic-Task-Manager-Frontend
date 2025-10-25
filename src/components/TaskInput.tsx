import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useState } from "react"
import type { TaskT } from "types/task"
import { api } from "@/lib/apiClient"

const TaskInput: React.FC<{
  getTasks: () => Promise<void>
}> = ({ getTasks }) => {
  const [description, setDescription] = useState("")

  const onSumbit = () => {
    api
      .post<TaskT>("/api/tasks", {
        description,
      })
      .then(() => setDescription(""))
      .then(() => getTasks())
  }

  return (
    <div className="flex flex-col gap-2 p-2 border-b-2 border-red-500">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Type your task here."
      />

      <Button onClick={onSumbit}>Create Task</Button>
    </div>
  )
}

export default TaskInput
