import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ParaclimbingPage from './pages/ParaclimbingPage';
import BelgianTeamPage from './pages/BelgianTeamPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SupportUsPage from './pages/SupportUsPage';
import ContactPage from './pages/ContactPage';
import LiveStreamPage from './pages/LiveStreamPage';
import AnalyseStreamPage from './pages/AnalyseStreamPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/paraclimbing" element={<ParaclimbingPage />} />
                <Route path="/belgian-team" element={<BelgianTeamPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/support-us" element={<SupportUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/live-stream" element={<LiveStreamPage />} />
                <Route path="/analyse_stream" element={<AnalyseStreamPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
};

export default App;
