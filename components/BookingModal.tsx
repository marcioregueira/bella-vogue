import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock as ClockIcon, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { Service, TimeSlot, BookingDetails } from '../types';
import { AVAILABLE_TIMES, SALON_SERVICES } from '../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: Service | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [details, setDetails] = useState<BookingDetails>({
    serviceId: '',
    date: null,
    timeSlot: null,
    clientName: '',
    clientEmail: '',
    clientPhone: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedService(preSelectedService || null);
      if (preSelectedService) {
        setDetails(d => ({ ...d, serviceId: preSelectedService.id }));
        setStep(2); // Skip straight to date if service provided
      }
    }
  }, [isOpen, preSelectedService]);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext(); // Go to success step
    // Here you would typically send data to backend
    console.log("Booking submitted:", { ...details, service: selectedService?.name });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-secondary px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="font-serif text-xl font-bold text-dark">Agendar Horário</h3>
            <p className="text-xs text-gray-500">Passo {step} de 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-dark mb-4">Selecione um Serviço</h4>
              <div className="grid grid-cols-1 gap-3">
                {SALON_SERVICES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      setDetails({ ...details, serviceId: s.id });
                      handleNext();
                    }}
                    className="flex items-center p-4 border rounded-xl hover:border-primary hover:bg-secondary/30 transition-all text-left group"
                  >
                    <img src={s.imageUrl} alt={s.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
                    <div className="flex-1">
                      <div className="font-bold text-dark group-hover:text-primary">{s.name}</div>
                      <div className="text-sm text-gray-500">R${s.price} • {s.durationMin} min</div>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div>
              <div className="mb-6 bg-secondary/50 p-4 rounded-lg flex items-center justify-between">
                <span className="font-bold text-primary">{selectedService?.name}</span>
                <button onClick={handleBack} className="text-xs underline text-gray-500">Alterar</button>
              </div>

              <h4 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                <Calendar size={20} /> Escolha Data e Hora
              </h4>
              
              {/* Fake Calendar for Visual */}
              <div className="mb-6">
                <input 
                  type="date" 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  onChange={(e) => setDetails({...details, date: new Date(e.target.value)})}
                />
              </div>

              <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wide">Horários Disponíveis</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {AVAILABLE_TIMES.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => {
                      setDetails({...details, timeSlot: slot.time});
                    }}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-all
                      ${!slot.available 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed decoration-slice' 
                        : details.timeSlot === slot.time 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-white text-dark hover:border-primary'
                      }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                 <button 
                  onClick={handleNext}
                  disabled={!details.date || !details.timeSlot}
                  className="bg-dark text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Info */}
          {step === 3 && (
             <form onSubmit={handleSubmit} className="space-y-4">
               <h4 className="text-lg font-bold text-dark mb-6">Seus Dados</h4>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                 <input 
                    required
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    value={details.clientName}
                    onChange={e => setDetails({...details, clientName: e.target.value})}
                  />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input 
                      required
                      type="email" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={details.clientEmail}
                      onChange={e => setDetails({...details, clientEmail: e.target.value})}
                    />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                   <input 
                      required
                      type="tel" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={details.clientPhone}
                      onChange={e => setDetails({...details, clientPhone: e.target.value})}
                    />
                 </div>
               </div>

               <div className="mt-8 flex justify-between items-center">
                 <button type="button" onClick={handleBack} className="text-gray-500 hover:text-dark flex items-center gap-1">
                   <ChevronLeft size={16} /> Voltar
                 </button>
                 <button 
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-rose-500 transition-all transform hover:-translate-y-1"
                >
                  Confirmar Agendamento
                </button>
               </div>
             </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-10 animate-fadeIn">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-dark mb-2">Agendamento Confirmado!</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Obrigado, {details.clientName}. Enviamos um email de confirmação para {details.clientEmail}.
              </p>
              
              <div className="bg-secondary/30 p-6 rounded-xl inline-block text-left mb-8 w-full max-w-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Serviço:</span>
                  <span className="font-bold text-dark">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Data:</span>
                  <span className="font-bold text-dark">{details.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Horário:</span>
                  <span className="font-bold text-dark">{details.timeSlot}</span>
                </div>
              </div>

              <div>
                <button 
                  onClick={onClose}
                  className="bg-dark text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Voltar para o Início
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;