import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ForgotPassword from './features/splash/components/ForgotPassword'; // Se você tiver criado este componente
import HomeScreen from './HomeScreen'; // Importe a tela inicial
import VaccineConsultation from './Vacinas';
import Medicamentos from './Medicamentos';
import SplashScreen from './features/splash/SplashScreen';
import Register from './features/splash/components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<HomeScreen />} /> {/* Nova rota para a tela inicial */}
        <Route path="/vacinas" element={<VaccineConsultation />} />
        <Route path="/medicamentos" element={<Medicamentos/>} />
      </Routes>
    </Router>
  );
};

export default App;