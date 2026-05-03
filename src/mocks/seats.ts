export interface SeatMap {
  eventId: number
  rows: SeatRow[]
}

export interface SeatRow {
  row: string
  seats: Seat[]
}

export interface Seat {
  seatNumber: string
  status: 'available' | 'occupied' | 'selected'
  category: 'normal' | 'vip' | 'camarote'
  price: number
}

export const mockSeatMaps: SeatMap[] = [
  {
    eventId: 1,
    rows: generateSeatsForEvent(1, 'normal', 50, 'vip', 80, 'camarote', 120)
  },
  {
    eventId: 2,
    rows: generateSeatsForEvent(2, 'normal', 45, 'vip', 75)
  },
  {
    eventId: 3,
    rows: generateSeatsForEvent(3, 'normal', 50, 'vip', 85)
  },
  {
    eventId: 4,
    rows: generateSeatsForEvent(4, 'normal', 55, 'vip', 90, 'camarote', 140)
  },
  {
    eventId: 5,
    rows: generateSeatsForEvent(5, 'normal', 48, 'vip', 78)
  },
  {
    eventId: 6,
    rows: generateSeatsForEvent(6, 'normal', 40, 'vip', 70)
  }
]

function generateSeatsForEvent(
  eventId: number,
  _normalCat: string,
  normalPrice: number,
  _vipCat: string,
  vipPrice: number,
  camaroteCat?: string,
  camarotePrice?: number
): SeatRow[] {
  const rows: SeatRow[] = []
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 20

  rowLetters.forEach((row) => {
    const seats: Seat[] = []
    for (let i = 1; i <= seatsPerRow; i++) {
      let category: 'normal' | 'vip' | 'camarote' = 'normal'
      let price = normalPrice
      let status: 'available' | 'occupied' = 'available'

      // Últimas 5 colunas são VIP
      if (i > 15) {
        category = 'vip'
        price = vipPrice
      }

      // Primeiras 2 colunas e últimas 2 são camarote (se existir)
      if (camaroteCat && (i <= 2 || i > 18)) {
        category = 'camarote'
        price = camarotePrice || 0
      }

      // Simular alguns assentos ocupados aleatoriamente
      if (Math.random() > 0.7) {
        status = 'occupied'
      }

      // Evento passado: todos ocupados
      if (eventId === 6) {
        status = 'occupied'
      }

      seats.push({
        seatNumber: `${row}${i}`,
        status,
        category,
        price
      })
    }

    rows.push({ row, seats })
  })

  return rows
}

export function getSeatMapByEventId(eventId: number): SeatMap | undefined {
  let map = mockSeatMaps.find(map => map.eventId === eventId)
  if (!map) {
    // Generate a default seat map for events not explicitly mocked
    map = {
      eventId,
      rows: generateSeatsForEvent(eventId, 'normal', 50, 'vip', 80, 'camarote', 120)
    }
  }
  return map
}

export function updateSeatStatus(eventId: number, seatNumber: string, status: 'available' | 'occupied' | 'selected'): void {
  const seatMap = getSeatMapByEventId(eventId)
  if (!seatMap) return

  seatMap.rows.forEach(row => {
    const seat = row.seats.find(s => s.seatNumber === seatNumber)
    if (seat) {
      seat.status = status
    }
  })
}
