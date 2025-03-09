import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TariffCalculator from './../tariff_calculator/TariffCalculator';
import BusinessInfoForm from './BusinessInfoForm'

import './../css/App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Tariff Calculator App</h1>
        <Routes>
          {/* Define a route for the TariffCalculator component */}
          <Route path="/" element={<TariffCalculator />} />
          <Route path="business-info-form" element={<BusinessInfoForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
