import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import ResultPage from "./pages/ResultPage"
import { fakeAnalyze } from "./api"


function App() {
  const [loading, setLoading] = useState(false)
  const [view,setView] = useState("home")
  const [file, setFile] = useState(null)

  async function analyze() {
    setLoading(true)
    try {
      await fakeAnalyze(file)
      setView("result")
    } catch {
      setView("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header onNavigate={setView} />
      {view === "home" && (
        <HomePage
          onNavigate={setView}
          file={file}
          onFileChange={setFile}
          loading={loading}
          onAnalyze={analyze}
        />
      )}
      {view === "result" && <ResultPage onNavigate={setView} file={file} />}
      {view === "error" && <ErrorPage onNavigate={setView} />}
      <Footer />
    </>
  )

}

export default App
