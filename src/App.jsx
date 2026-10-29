import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import ResultPage from "./pages/ResultPage"


function App() {
  const [view,setView] = useState("home")
  const [file, setFile] = useState(null)
  console.log("view =", view)  
  return (
    <>
      <Header />
      {view === "home" && <HomePage onNavigate={setView} file={file} onFileChange={setFile} />}
      {view === "result" && <ResultPage onNavigate={setView} file={file} />}
      {view === "error" && <ErrorPage onNavigate={setView} />}
      <Footer />
    </>
  )
}

export default App
