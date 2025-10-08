import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import HomeScreen from './features/home/HomeScreen';
import VaccineConsultation from './Vacinas';
import Medicamentos from './Medicamentos';
import SplashScreen from './features/splash/SplashScreen';
import SplashScreenForgotPassword from './features/splash/SplashScrenForgotPassword';
import SplashScreenRegister from './features/splash/SplashScrenRegister';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/forgot-password" element={<SplashScreenForgotPassword />} />
        <Route path="/register" element={<SplashScreenRegister/>} />
        <Route path="/home" element={<HomeScreen/>} />
        <Route path="/vacinas" element={<VaccineConsultation />} />
        <Route path="/medicamentos" element={<Medicamentos/>} />
      </Routes>
    </Router>
  );
};

export default App;