import './App.css';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import { Route, Routes } from 'react-router-dom';
import { routes } from './constants';
import CommonLayout from './layout/CommonLayout';
import './App.css'
import PageError from './pages/404page';
import ReactionZero from './pages/ReactionRates/zero';
import ReactionZeroQuiz from './pages/ReactionRates/zeroQuiz';
import ReactionFirst from './pages/ReactionRates/first';
import ReactionFirstQuiz from './pages/ReactionRates/firstQuiz';
import ReactionSecond from './pages/ReactionRates/second';
import ReactionSecondQuiz from './pages/ReactionRates/secondQuiz';
import ReactionComparison from './pages/ReactionRates/comparison';
import ReactionComparisonQuiz from './pages/ReactionRates/comparisonQuiz';
import ReactionKinetics from './pages/ReactionRates/kinetics';
import ReactionKineticsQuiz from './pages/ReactionRates/kineticsQuiz';

function App() {
  return (
    <CommonLayout>
      <Routes>
        <Route path={routes.zero.path} index element={<ReactionZero />} />
        <Route path={routes.zeroQuiz.path} index element={<ReactionZeroQuiz />} />
        <Route path={routes.first.path} element={<ReactionFirst />} />
        <Route path={routes.firstQuiz.path} element={<ReactionFirstQuiz />} />
        <Route path={routes.second.path} element={<ReactionSecond />} />
        <Route path={routes.secondQuiz.path} element={<ReactionSecondQuiz />} />
        <Route path={routes.comparison.path} element={<ReactionComparison />} />
        <Route path={routes.comparisonQuiz.path} element={<ReactionComparisonQuiz />} />
        <Route path={routes.kinetics.path} element={<ReactionKinetics />} />
        <Route path={routes.kineticsQuiz.path} element={<ReactionKineticsQuiz />} />
        <Route path='*' element={<PageError />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='nopage' element={<PageError />} />
      </Routes>
    </CommonLayout>
  );
}

export default App;
