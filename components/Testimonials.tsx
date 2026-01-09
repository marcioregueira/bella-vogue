import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-dark mb-4">Love Notes</h2>
          <p className="text-gray-500">O que nossas clientes dizem sobre a experiência BellaVogue.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-secondary p-8 rounded-2xl relative">
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex gap-1 text-amber-400 mb-4 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">"{t.content}"</p>
              
              <div>
                <h4 className="font-serif font-bold text-dark">{t.name}</h4>
                <p className="text-xs text-primary uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;