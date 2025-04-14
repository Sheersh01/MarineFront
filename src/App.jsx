// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OilSpills from './components/OilSpills'
import IllegalFishing from './components/IllegalFishing'
import OceanTrafficking from './components/OceanTrafficking'
import Home from './components/Home'
import DashboardAnalysis from './components/DashboardAnalysis'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oil-spills" element={<OilSpills />} />
        <Route path="/illegal-fishing" element={<IllegalFishing />} />
        <Route path="/ocean-trafficking" element={<OceanTrafficking />} />
        <Route path="/dashboard-analysis" element={<DashboardAnalysis />} />
      </Routes>
    </Router>
  )
}

export default App