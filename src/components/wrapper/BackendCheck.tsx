import { api } from "@/lib/apiClient"
import type React from "react"
import { useEffect, useState } from "react"

const BackendCheck: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    api
      .get("/health")
      .then(() => setActive(true))
      .catch(console.log)
  }, [])

  return (
    <>
      {active && children}
      {!active && <div> Server waking up....</div>}
    </>
  )
}

export default BackendCheck
