export interface User {
  id: number
  email: string
  password: string
  name: string
  createdAt: Date
}

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'usuario@ticket.com',
    password: '123456',
    name: 'Usuário Demo',
    createdAt: new Date('2026-01-01')
  }
]

export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find(user => user.email === email)
}

export function validateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    return user
  }
  return null
}

export function createUser(email: string, password: string, name: string): User {
  const newUser: User = {
    id: Math.max(...mockUsers.map(u => u.id), 0) + 1,
    email,
    password,
    name,
    createdAt: new Date()
  }
  mockUsers.push(newUser)
  return newUser
}
