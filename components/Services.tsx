import React, { useState } from 'react';
import { SALON_SERVICES } from '../constants';
import { Category, Service } from '../types';
import { Clock, Plus } from 'lucide-react';

interface ServicesProps {
  onBookService: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Object.values(Category)];

  const filteredServices = activeCategory === 'Todos'
    ? SALON_SERVICES
    : SALON_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-dark mb-4">Menu de Serviços</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para transformar seu visual. 
            Utilizamos apenas produtos de linha premium.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-bold tracking-wide uppercase
                ${activeCategory === cat 
                  ? 'bg-dark text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-500 hover:bg-primary/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-dark shadow-sm">
                  {service.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl font-bold text-dark group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-lg font-bold text-primary">
                    R${service.price}
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={16} className="mr-1" />
                    {service.durationMin} min
                  </div>
                  
                  <button
                    onClick={() => onBookService(service)}
                    className="flex items-center gap-1 text-dark font-bold hover:text-primary transition-colors text-sm uppercase tracking-wide"
                  >
                    Agendar
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;