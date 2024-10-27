import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./Pages/MainPage";
import SubPage from "./Pages/SubPage";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/groupDetail" element={<SubPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
