export interface TicketCategory {
  id: string
  name: string
  price: number
  available: number
}

export interface Event {
  id: number
  title: string
  description: string
  date: Date
  time: string
  location: string
  duration: string
  classification: string
  poster: string
  categories: TicketCategory[]
  totalSeats: number
}

export const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Mundos Além',
    description: 'Uma tripulação parte em missão impossível para salvar a humanidade nos confins do universo.',
    date: new Date('2026-04-25'),
    time: '19:30',
    location: 'Cineplex - Sala 1',
    duration: '2h 18min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1446776511953-b23d57bd21aa?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 50, available: 120 },
      { id: 'vip', name: 'VIP', price: 80, available: 30 },
      { id: 'camarote', name: 'Camarote', price: 120, available: 15 }
    ],
    totalSeats: 200
  },
  {
    id: 2,
    title: 'A Última Dança',
    description: 'Duas almas perdidas se encontram numa cidade que nunca dorme e descobrem o que realmente importa.',
    date: new Date('2026-04-26'),
    time: '20:00',
    location: 'Cineplex - Sala 2',
    duration: '1h 52min',
    classification: 'L',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 45, available: 150 },
      { id: 'vip', name: 'VIP', price: 75, available: 40 }
    ],
    totalSeats: 200
  },
  {
    id: 3,
    title: 'Sombras do Passado',
    description: 'Um detetive obcecado reabre o caso mais perturbador de sua carreira e descobre uma verdade sombria.',
    date: new Date('2026-04-27'),
    time: '21:00',
    location: 'Cineplex - Sala 3',
    duration: '2h 05min',
    classification: '16',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 50, available: 100 },
      { id: 'vip', name: 'VIP', price: 85, available: 25 }
    ],
    totalSeats: 160
  },
  {
    id: 4,
    title: 'Era dos Heróis',
    description: 'Quando o mal antigo retorna, apenas os lendários podem impedir o fim de tudo que existe.',
    date: new Date('2026-04-28'),
    time: '19:00',
    location: 'Cineplex - Sala 1',
    duration: '2h 34min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 55, available: 110 },
      { id: 'vip', name: 'VIP', price: 90, available: 35 },
      { id: 'camarote', name: 'Camarote', price: 140, available: 10 }
    ],
    totalSeats: 220
  },
  {
    id: 5,
    title: 'Neon City',
    description: 'Uma jornada visual alucinante pelas ruas neon de uma megalópole futurista.',
    date: new Date('2026-04-29'),
    time: '20:30',
    location: 'Cineplex - Sala 2',
    duration: '1h 58min',
    classification: '16',
    poster: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 48, available: 130 },
      { id: 'vip', name: 'VIP', price: 78, available: 35 }
    ],
    totalSeats: 200
  },
  {
    id: 6,
    title: 'O Jardim Secreto',
    description: 'Uma história tocante sobre redescobrir a beleza e a esperança.',
    date: new Date('2026-04-20'),
    time: '18:00',
    location: 'Cineplex - Sala 3',
    duration: '1h 45min',
    classification: 'L',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 40, available: 0 },
      { id: 'vip', name: 'VIP', price: 70, available: 0 }
    ],
    totalSeats: 180
  },
  {
    id: 7,
    title: 'Código Vermelho',
    description: 'Um thriller tenso e emocionante que mantém o espectador na beira do assento do início ao fim.',
    date: new Date('2026-05-15'),
    time: '19:00',
    location: 'Cineplex - Sala 2',
    duration: '2h 02min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 52, available: 200 },
      { id: 'vip', name: 'VIP', price: 82, available: 50 }
    ],
    totalSeats: 250
  },
  {
    id: 8,
    title: 'Lua de Mel',
    description: 'Uma comédia romântica hilariante sobre casais e suas aventuras inesperadas.',
    date: new Date('2026-05-22'),
    time: '20:30',
    location: 'Cineplex - Sala 1',
    duration: '1h 38min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 45, available: 180 },
      { id: 'vip', name: 'VIP', price: 75, available: 45 }
    ],
    totalSeats: 225
  },
  {
    id: 9,
    title: 'Raízes',
    description: 'Um documentário premiado que explora as conexões profundas entre as gerações e a natureza. Festival de Cannes 2026.',
    date: new Date('2026-04-30'),
    time: '21:00',
    location: 'Cineplex - Sala Premium',
    duration: '1h 32min',
    classification: 'L',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 60, available: 120 },
      { id: 'vip', name: 'VIP', price: 100, available: 30 }
    ],
    totalSeats: 150
  },
  {
    id: 10,
    title: 'Silêncio Branco',
    description: 'Um drama intenso e contemplativo que foi aclamado pela crítica. Premiado em Sundance Film Festival 2026.',
    date: new Date('2026-05-08'),
    time: '19:30',
    location: 'Cineplex - Sala Premium',
    duration: '1h 58min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 60, available: 140 },
      { id: 'vip', name: 'VIP', price: 100, available: 35 }
    ],
    totalSeats: 175
  },
  // Em Breve (11-15)
  {
    id: 11,
    title: 'Estreias Caídas',
    description: 'Um romance épico que promete emocionar e conquistar corações em todo o mundo.',
    date: new Date('2026-06-15'),
    time: '19:00',
    location: 'Cineplex - Sala 1',
    duration: '2h 10min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 50, available: 150 },
      { id: 'vip', name: 'VIP', price: 80, available: 40 }
    ],
    totalSeats: 190
  },
  {
    id: 12,
    title: 'Império das Sombras',
    description: 'Uma épica de fantasia com efeitos visuais deslumbrantes e uma história envolvente.',
    date: new Date('2026-06-22'),
    time: '20:00',
    location: 'Cineplex - Sala 2',
    duration: '2h 45min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 55, available: 120 },
      { id: 'vip', name: 'VIP', price: 85, available: 35 },
      { id: 'camarote', name: 'Camarote', price: 130, available: 15 }
    ],
    totalSeats: 170
  },
  {
    id: 13,
    title: 'Velocidade Máxima',
    description: 'Um thriller de ação acelerado com perseguições alucinantes e reviravoltas inesperadas.',
    date: new Date('2026-07-01'),
    time: '19:30',
    location: 'Cineplex - Sala 3',
    duration: '2h 10min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 52, available: 140 },
      { id: 'vip', name: 'VIP', price: 82, available: 40 }
    ],
    totalSeats: 180
  },
  {
    id: 14,
    title: 'O Último Verão',
    description: 'Uma história tocante sobre amizade, amor e a passagem do tempo durante um verão inesquecível.',
    date: new Date('2026-07-12'),
    time: '20:30',
    location: 'Cineplex - Sala 1',
    duration: '1h 42min',
    classification: 'L',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 45, available: 160 },
      { id: 'vip', name: 'VIP', price: 75, available: 50 }
    ],
    totalSeats: 210
  },
  {
    id: 15,
    title: 'Renascimento',
    description: 'Uma ficção científica que explora a possibilidade de renascimento e redenção em um mundo distópico.',
    date: new Date('2026-07-20'),
    time: '19:00',
    location: 'Cineplex - Sala 2',
    duration: '2h 08min',
    classification: '16',
    poster: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 54, available: 130 },
      { id: 'vip', name: 'VIP', price: 84, available: 40 }
    ],
    totalSeats: 170
  },
  // Festival (16-20)
  {
    id: 16,
    title: 'Olhos do Mundo',
    description: 'Uma obra de arte que captura a essência da humanidade através de perspectivas únicas. Premiado em Festival de Berlim.',
    date: new Date('2026-05-12'),
    time: '19:00',
    location: 'Cineplex - Sala Premium',
    duration: '2h 15min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 65, available: 110 },
      { id: 'vip', name: 'VIP', price: 105, available: 30 }
    ],
    totalSeats: 140
  },
  {
    id: 17,
    title: 'Memórias',
    description: 'Um filme biográfico poderoso que retrata uma vida extraordinária. Aclamado em Festival de Veneza.',
    date: new Date('2026-05-19'),
    time: '20:00',
    location: 'Cineplex - Sala Premium',
    duration: '2h 25min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 65, available: 100 },
      { id: 'vip', name: 'VIP', price: 105, available: 25 }
    ],
    totalSeats: 125
  },
  {
    id: 19,
    title: 'Horizonte Infinito',
    description: 'Uma aventura épica que expande os limites da imaginação. Selecionado para Festival de Cannes.',
    date: new Date('2026-06-02'),
    time: '20:30',
    location: 'Cineplex - Sala Premium',
    duration: '2h 20min',
    classification: '12',
    poster: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 65, available: 120 },
      { id: 'vip', name: 'VIP', price: 105, available: 35 }
    ],
    totalSeats: 155
  },
  {
    id: 20,
    title: 'Confluência',
    description: 'Um drama envolvente sobre encontros cruciais que mudam vidas. Destaque em Sundance Film Festival.',
    date: new Date('2026-06-09'),
    time: '19:00',
    location: 'Cineplex - Sala Premium',
    duration: '1h 55min',
    classification: '14',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80',
    categories: [
      { id: 'normal', name: 'Normal', price: 65, available: 115 },
      { id: 'vip', name: 'VIP', price: 105, available: 30 }
    ],
    totalSeats: 145
  }
]

export function getUpcomingEvents(): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return mockEvents.filter(event => new Date(event.date) >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getPastEvents(): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return mockEvents.filter(event => new Date(event.date) < today).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getEventById(id: number): Event | undefined {
  return mockEvents.find(event => event.id === id)
}
