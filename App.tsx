import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AIConsultant from './components/AIConsultant';
import { Service } from './types';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (service?: Service) => {
    if (service) {
      setPreSelectedService(service);
    } else {
      setPreSelectedService(null);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col font-sans">
      <Header 
        onNavigate={handleNavigate} 
        onOpenBooking={() => handleOpenBooking()} 
      />
      
      <main className="flex-grow">
        <Hero 
          onOpenBooking={() => handleOpenBooking()}
          onExplore={() => handleNavigate('services')}
        />
        
        <Services 
          onBookService={handleOpenBooking} 
        />
        
        <Testimonials />
      </main>

      <Footer />

      {/* Overlays */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={preSelectedService}
      />
      
      <AIConsultant />
    </div>
  );
}

export default App;