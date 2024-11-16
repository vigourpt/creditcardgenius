import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator';
import Blog from './components/Blog';
import BlogArticle from './components/BlogArticle';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
            <Header />
            <main className="pt-6">
              <Routes>
                <Route path="/" element={<Calculator />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}