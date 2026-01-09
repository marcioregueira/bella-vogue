import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">BellaVogue</h3>
            <p className="text-gray-400 mb-6">
              Onde a beleza encontra o bem-estar. Dedicados a fornecer serviços excepcionais em um ambiente relaxante e luxuoso.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <span>Rua Oscar Freire, 1234<br />Jardins, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span>(11) 99999-8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span>contato@bellavogue.com.br</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-bold mb-6">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Segunda - Sexta</span>
                <span>09:00 - 20:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Sábado</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Domingo</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BellaVogue Salon. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;