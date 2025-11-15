import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import HomeScreen from './features/home/HomeScreen';
import VaccineConsultation from './shared/components/Vacinas';
import Medicamentos from './shared/components/Medicamentos';
import SplashScreen from './features/splash/SplashScreen';
import SplashScreenForgotPassword from './features/splash/SplashScrenForgotPassword';
import SplashScreenRegister from './features/splash/SplashScrenRegister';
import PrivateRoute from './shared/components/PrivateRoute';
// Removido AuthProvider não utilizado
import PublicRoute from './shared/components/PublicRoute';
import { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';
import useAuthStore from './shared/store/auth-store';

// ----- IMPORT CORRIGIDO -----
// 1. A ÚNICA PÁGINA que precisamos importar é a InicialPage
import InicialPage from './shared/components/InicialPage'; 

// 2. REMOVEMOS os imports que estavam dando erro:
// import ChatPage from './features/chat/ChatPage'; (REMOVIDO)
// import LeituraTelaPage from './features/leitura/LeituraTelaPage'; (REMOVIDO)
// import MapaPage from './features/mapa/MapaPage'; (REMOVIDO)
// import SettingsPage from './features/settings/SettingsPage'; (REMOVIDO)


const App = () => {
  const [token, setToken] = React.useState(null);
  const { setFcmToken } = useAuthStore()
  const {user} = useAuthStore();

  // ... (seu useEffect do Firebase - SEM MUDANÇAS) ...
  React.useEffect(() => {
    requestForToken()
      .then((currentToken) => {
        setToken(currentToken);
        setFcmToken(currentToken)
      })
      .catch((err) => {
        console.error("Erro ao solicitar token:", err);
      });
  }, []);

  React.useEffect(() => {
    const unsubscribe = onMessageListener().then(() => {
    });
    return () => {
    };
  }, []);

  return (
    <div className="App">
      <HashRouter> 
        
        {/* ----- Rotas Públicas (Sem alterações) ----- */}
        {!user && <PublicRoute>
          <Routes>
            <Route path="/forgot-password" element={<SplashScreenForgotPassword />} />
            <Route path="*" element={<SplashScreen />} />
          </Routes>
        </PublicRoute>}

        {/* ----- Rotas Privadas (CORRIGIDO) ----- */}
        {user && <PrivateRoute>
          <Routes>
            {/* Suas rotas que NÃO TÊM a barra de navegação */}
            <Route path="/vacinas" element={<VaccineConsultation />} />
            <Route path="/medicamentos" element={<Medicamentos />} />

            {/* A rota /home aponta para InicialPage. 
                O InicialPage.js agora cuida do resto (Settings, Mapa, etc.)
            */}
            <Route path="/home" element={<InicialPage />} /> 

            {/* Rota fallback original, apontando para HomeScreen
                (ou talvez devesse ser InicialPage também?)
                Vamos manter seu original por via das dúvidas.
            */}
            <Route path="*" element={<HomeScreen />} /> 

            {/* REMOVEMOS as rotas que davam erro:
            <Route element={<InicialPage />}> 
              <Route path="/home" element={<ChatPage />} /> 
              ...
            </Route>
            */}
          </Routes>
        </PrivateRoute>}
      </HashRouter>
      <Toaster />
    </div>
  );
};

export default App;