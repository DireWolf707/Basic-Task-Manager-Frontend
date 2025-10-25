import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import type { TaskT } from "../types/task"
import TaskInput from "./components/TaskInput"
import Task from "./components/Task"
import BackendCheck from "./components/wrapper/BackendCheck"

const App = () => {
  const [tasks, setTasks] = useState<TaskT[]>([])

  const getTasks = useCallback(
    () =>
      axios
        .get<TaskT[]>("http://localhost:5228/api/tasks")
        .then((res) => setTasks(res.data))
        .catch((error) => console.error("Error fetching tasks:", error)),
    []
  )

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="bg-black h-screen w-screen flex flex-col text-white overflow-auto">
      <BackendCheck>
        <div className="flex flex-col mx-auto my-4 w-lg">
          <span className="text-red-400 font-bold text-xl text-center mb-2">
            Task Manager
          </span>

          <div className="border-4 rounded-lg p-2 border-red-400">
            <TaskInput getTasks={getTasks} />

            <div className="flex flex-col gap-3 p-2">
              {tasks.map((task) => (
                <Task key={task.id} task={task} getTasks={getTasks} />
              ))}
            </div>
          </div>
        </div>
      </BackendCheck>
    </div>
  )
}

export default App
