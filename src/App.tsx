import axios from "axios"
import { useEffect } from "react"

const App = () => {
  useEffect(() => {
    axios.get("http://localhost:5228/api/tasks").then(console.log)
  }, [])

  return <div>App</div>
}

export default App
