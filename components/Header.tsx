import React, { useState } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenBooking }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Serviços', id: 'services' },
    { label: 'Depoimentos', id: 'testimonials' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-secondary/90 backdrop-blur-md shadow-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNav('hero')}
        >
          <div className="bg-primary p-2 rounded-full text-white">
            <Scissors size={24} />
          </div>
          <span className="text-2xl font-serif font-bold text-dark tracking-wide">
            BellaVogue
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-dark hover:text-primary transition-colors font-medium text-sm tracking-widest uppercase"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenBooking}
            className="bg-dark text-white px-6 py-2 rounded-full font-medium hover:bg-primary transition-colors duration-300"
          >
            Agendar Agora
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-primary/20 absolute w-full">
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left text-dark hover:text-primary py-2 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenBooking();
                setIsMenuOpen(false);
              }}
              className="bg-primary text-white w-full py-3 rounded-lg font-bold"
            >
              Agendar Horário
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;