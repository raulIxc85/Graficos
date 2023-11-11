

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Settings from "./components/pages/Settings";
import Products from "./components/pages/products/Products";
import Home from "./components/pages/Home";
import Analytics from "./components/pages/Analytics";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clientes" element={<Products />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
