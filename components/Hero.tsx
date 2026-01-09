import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplore }) => {
  return (
    <section id="hero" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/431/1920/1080" 
          alt="Luxury Salon Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <span className="block text-primary font-bold tracking-[0.2em] mb-4 text-sm md:text-base uppercase animate-fadeIn">
          Beleza & Bem-Estar
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Realce Sua <br />
          <span className="italic text-primary">Beleza Natural</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200 font-light max-w-2xl mx-auto">
          Experimente o luxo e a sofisticação em cada detalhe. Dos cuidados com as unhas aos tratamentos capilares exclusivos.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={onOpenBooking}
            className="group bg-primary text-dark hover:bg-white transition-all duration-300 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2"
          >
            Agendar Visita
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button
            onClick={onExplore}
            className="px-8 py-4 rounded-full border border-white text-white hover:bg-white hover:text-dark transition-all duration-300 font-medium text-lg"
          >
            Nossos Serviços
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;