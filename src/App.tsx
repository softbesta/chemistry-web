import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import { Route, Routes } from 'react-router-dom';
import ReactionZero from './pages/ReactionRates/zero';
import ReactionFirst from './pages/ReactionRates/first';
import { routes } from './constants';
import CommonLayout from './layout/CommonLayout';
import './App.css'

function App() {
  return (
    <CommonLayout>
      <Routes>
        <Route path={routes.ch1_zero.path} index element={<ReactionZero />} />
        <Route path={routes.ch1_first.path} element={<ReactionFirst />} />
        <Route path='about' element={<AboutPage />} />
      </Routes>
    </CommonLayout>
  );
}

export default App;
