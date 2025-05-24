import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;