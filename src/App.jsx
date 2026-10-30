import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import { useState } from "react"
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage"
import ResultPage from "./pages/ResultPage"
import { fakeAnalyze } from "./analyze"


function App() {
  const [loading, setLoading] = useState(false)
  const [view,setView] = useState("home")
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [errorReason, setErrorReason] = useState("")

  async function analyze() {
    setLoading(true)
    try {
      const data = await fakeAnalyze(file)
      setResult(data)
      setView("result")
    } catch (err) {
      setErrorReason(err.reason)
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
      {view === "result" && <ResultPage onNavigate={setView} file={file} result={result}/>}
      {view === "error" && <ErrorPage onNavigate={setView} reason={errorReason} />}
      <Footer />
    </>
  )

}

export default App
