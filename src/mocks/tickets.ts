export interface PurchasedTicket {
  id: string
  eventId: number
  userId: number
  category: string
  seats: string[]
  price: number
  purchaseDate: Date
  qrCode: string
}

export const mockTickets: PurchasedTicket[] = [
  {
    id: 'TICKET-001',
    eventId: 2,
    userId: 1,
    category: 'normal',
    seats: ['A5', 'A6'],
    price: 90,
    purchaseDate: new Date('2026-04-10'),
    qrCode: 'QR-TICKET-001'
  },
  {
    id: 'TICKET-002',
    eventId: 3,
    userId: 1,
    category: 'vip',
    seats: ['VIP-12'],
    price: 85,
    purchaseDate: new Date('2026-04-15'),
    qrCode: 'QR-TICKET-002'
  }
]

export function getTicketsByUserId(userId: number): PurchasedTicket[] {
  return mockTickets.filter(ticket => ticket.userId === userId)
}

export function getTicketById(ticketId: string): PurchasedTicket | undefined {
  return mockTickets.find(ticket => ticket.id === ticketId)
}

export function addTicket(ticket: PurchasedTicket): void {
  mockTickets.push(ticket)
}
