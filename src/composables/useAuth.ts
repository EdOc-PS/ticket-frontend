import { ref, computed } from 'vue'
import type { User } from '../mocks/users'
import { validateUser, createUser } from '../mocks/users'

const currentUser = ref<User | null>(null)
const rememberMe = ref(false)

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)
  const user = computed(() => currentUser.value)

  function login(email: string, password: string, remember: boolean = false): boolean {
    const validatedUser = validateUser(email, password)
    if (validatedUser) {
      currentUser.value = validatedUser
      rememberMe.value = remember
      if (remember) {
        localStorage.setItem('rememberedEmail', email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      return true
    }
    return false
  }

  function register(email: string, password: string, name: string): boolean {
    try {
      createUser(email, password, name)
      return login(email, password, false)
    } catch {
      return false
    }
  }

  function logout() {
    currentUser.value = null
    if (!rememberMe.value) {
      localStorage.removeItem('rememberedEmail')
    }
  }

  function getRememberedEmail(): string | null {
    return localStorage.getItem('rememberedEmail')
  }

  return {
    isAuthenticated,
    user,
    rememberMe,
    login,
    register,
    logout,
    getRememberedEmail
  }
}
