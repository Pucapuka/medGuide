import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BuscarMedicamentos from './pages/BuscarMedicamentos';
import Dicas from './pages/Dicas';
import Sobre from './pages/Sobre';

function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<BuscarMedicamentos />} />
        <Route path="/dicas" element={<Dicas />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;