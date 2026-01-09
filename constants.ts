import { Category, Service, TimeSlot } from './types';

export const SALON_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Corte & Styling Signature',
    description: 'Um corte personalizado desenhado para realçar a estrutura do seu rosto, finalizado com uma escova luxuosa.',
    price: 180,
    durationMin: 60,
    category: Category.HAIR,
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'Coloração Balayage',
    description: 'Técnica de iluminação pintada à mão para um efeito natural e beijado pelo sol.',
    price: 450,
    durationMin: 180,
    category: Category.HAIR,
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'Manicure Gel Premium',
    description: 'Cuidado completo das cutículas e esmaltação em gel de alta durabilidade e brilho intenso.',
    price: 90,
    durationMin: 60,
    category: Category.NAILS,
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Pedicure Spa Relaxante',
    description: 'Imersão em sais minerais, esfoliação, massagem nos pés e esmaltação perfeita.',
    price: 110,
    durationMin: 75,
    category: Category.NAILS,
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: '5',
    name: 'Massagem Aromaterapia',
    description: 'Massagem corporal completa utilizando óleos essenciais para relaxamento profundo.',
    price: 220,
    durationMin: 60,
    category: Category.SPA,
    imageUrl: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: '6',
    name: 'Maquiagem Festa',
    description: 'Produção completa para eventos, incluindo preparação de pele e cílios postiços.',
    price: 250,
    durationMin: 90,
    category: Category.MAKEUP,
    imageUrl: 'https://picsum.photos/400/300?random=6'
  }
];

export const AVAILABLE_TIMES: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false }, // Booked example
  { time: '13:00', available: true },
  { time: '14:30', available: true },
  { time: '16:00', available: true },
  { time: '17:30', available: true },
  { time: '19:00', available: false },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Cliente VIP",
    content: "O melhor corte de cabelo que já tive! A equipe é extremamente atenciosa e o ambiente é puro luxo.",
    avatar: "https://picsum.photos/100/100?random=10"
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Noiva",
    content: "Fiz meu dia da noiva aqui e foi mágico. A maquiagem durou a noite toda e me senti uma princesa.",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    id: 3,
    name: "Carolina Santos",
    role: "Advogada",
    content: "A praticidade de agendar online e a pontualidade são essenciais para mim. Recomendo de olhos fechados.",
    avatar: "https://picsum.photos/100/100?random=12"
  }
];