import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import ResultPage from "./pages/ResultPage"


function App() {
  const [view,setView] = useState("home")
  console.log("view =", view)  
  return (
    <>
      <Header />
      {view === "home" && <HomePage onNavigate={setView} />}
      {view === "result" && <ResultPage onNavigate={setView} />}
      {view === "error" && <ErrorPage onNavigate={setView} />}
      <Footer />
    </>
  )
}

export default App
