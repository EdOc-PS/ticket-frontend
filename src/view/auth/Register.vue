<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { PhEnvelope, PhLockKey, PhUser } from '@phosphor-icons/vue'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'Preencha todos os campos.'
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
  loading.value = false

  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6">
    <div class="w-full max-w-sm">

      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="font-heading text-2xl font-bold text-neutral-900 tracking-tight">Criar conta</h1>
        <p class="mt-1 text-neutral-500 text-sm">Preencha seus dados para começar</p>
      </div>

      <form
        @submit.prevent="handleRegister"
        class="rounded-3xl bg-white backdrop-blur-xl p-8 shadow-sm space-y-4"
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
