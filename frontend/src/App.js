import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Bootcamps from './pages/Bootcamps';
import BootcampDetail from './pages/BootcampDetail';
import Contact from './pages/Contact';
import BookingForm from './pages/BookingForm';
import BookingSuccess from './pages/BookingSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bootcamps" element={<Bootcamps />} />
            <Route path="/bootcamp/:id" element={<BootcampDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;