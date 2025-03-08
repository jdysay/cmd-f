import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Index from "./Index";
import Lookup from "./Lookup";
import './../css/App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />}/>
          <Route path="lookup" element={<Lookup />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
