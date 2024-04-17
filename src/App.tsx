import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import { Route, Routes } from 'react-router-dom';
import ReactionZero from './pages/ReactionRates/zero';
import ReactionFirst from './pages/ReactionRates/first';
import { routes } from './constants';
import CommonLayout from './layout/CommonLayout';
import './App.css'
import PageError from './pages/404page';
import ReactionZeroQuiz from './pages/ReactionRates/zeroQuiz';

function App() {
  return (
    <CommonLayout>
      <Routes>
        <Route path={routes.zero.path} index element={<ReactionZero />} />
        <Route path={routes.zeroQuiz.path} index element={<ReactionZeroQuiz />} />
        <Route path={routes.first.path} element={<ReactionFirst />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='nopage' element={<PageError />} />
      </Routes>
    </CommonLayout>
  );
}

export default App;
