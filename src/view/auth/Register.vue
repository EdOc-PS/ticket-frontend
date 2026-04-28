<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PhEnvelope, PhLockKey, PhUser, PhUserPlus } from '@phosphor-icons/vue'
import { useAuth } from '../../composables/useAuth'
import { findUserByEmail } from '../../mocks/users'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import MemphisBackground from '../../components/ui/MemphisBackground.vue'

const router = useRouter()
const { register, isAuthenticated } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/home')
  }
})

async function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Preencha todos os campos.'
    return
  }

  if (findUserByEmail(email.value)) {
    error.value = 'E-mail já cadastrado.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }

  loading.value = true
  await new Promise(r => setTimeout(r, 900))

  if (register(email.value, password.value, name.value)) {
    router.push('/home')
  } else {
    error.value = 'Erro ao criar conta. Tente novamente.'
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6 relative overflow-hidden">
    <!-- Memphis Background -->
    <MemphisBackground />

    <!-- Form content -->
    <div class="w-full max-w-sm relative z-10">

      <div class="text-center mb-10 animate-fade-in-up stagger-1">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 mb-6 shadow-lg shadow-blue-500/25">
          <PhUserPlus weight="duotone" class="text-white" :size="28" />
        </div>
        <h1 class="font-heading text-2xl font-bold text-neutral-900 tracking-tight">Criar conta</h1>
        <p class="mt-1 text-neutral-500 text-sm">Preencha seus dados para começar</p>
      </div>

      <form
        @submit.prevent="handleRegister"
        class="rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-xl shadow-black/5 border border-white/60 space-y-4 animate-fade-in-up stagger-2"
      >
        <Input
          label="Nome completo"
          type="text"
          placeholder="Seu nome"
          :icon="PhUser"
          v-model="name"
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="voce@exemplo.com"
          :icon="PhEnvelope"
          v-model="email"
        />

        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          :icon="PhLockKey"
          v-model="password"
        />

        <Input
          label="Confirmar senha"
          type="password"
          placeholder="••••••••"
          :icon="PhLockKey"
          v-model="confirmPassword"
        />

        <div
          v-if="error"
          class="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
        >
          {{ error }}
        </div>

        <div class="pt-2">
          <Button label="Criar conta" type="submit" :loading="loading" />
        </div>

        <p class="text-center text-xs text-neutral-400">
          Já tem uma conta?
          <router-link to="/auth/login" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">
            Entrar
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
