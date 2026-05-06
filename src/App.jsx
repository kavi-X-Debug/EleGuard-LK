import { Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LiveMap from './pages/LiveMap';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
