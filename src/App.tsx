import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='about' element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
