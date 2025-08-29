import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword'; // Se você tiver criado este componente
import HomeScreen from './HomeScreen'; // Importe a tela inicial

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomeScreen />} /> {/* Nova rota para a tela inicial */}
      </Routes>
    </Router>
  );
};

export default App;