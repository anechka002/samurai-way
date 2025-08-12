import { useEffect, useState } from "react"
import "./App.css"
import { Header, NavBar } from "./components"
import { Routing } from "./routing"
import { useAppDispatch } from "./hooks"
import { initialize } from "./redux/app-reducer"
import { Preloader } from "./components/common"

function App() {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    dispatch(initialize())
    .then(() => {
      setIsInitialized(true)
    })
    .catch(() => {
      setIsInitialized(true)
    })
  }, [])

  if(!isInitialized) {
    return (
      <Preloader/>
    )
  }

  return (
    <div className="app-wrapper">
      <Header />
      <NavBar />
      <div className="app-wrapper-content">
        <Routing />
      </div>
    </div>
  )
}

export default App
