import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TariffCalculator from './../tariff_calculator/TariffCalculator';
import BusinessInfoForm from './BusinessInfoForm'

import './../css/App.css'

function App() {
  console.log("hello there email");
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define a route for the TariffCalculator component */}
          <Route path="/" element={<TariffCalculator />} />
          <Route path="business-info-form" element={<BusinessInfoForm userEmail="NgXi9b2B6YcVluTl1K6FnTKMgso2" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
