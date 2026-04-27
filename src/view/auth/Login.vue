<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PhEnvelope, PhLockKey, PhFilmSlate } from '@phosphor-icons/vue'
import { useAuth } from '../../composables/useAuth'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'
import MemphisBackground from '../../components/ui/MemphisBackground.vue'

const router = useRouter()
const { login, isAuthenticated, getRememberedEmail } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/home')
    return
  }

  const rememberedEmail = getRememberedEmail()
  if (rememberedEmail) {
    email.value = rememberedEmail
  }
})

async function handleLogin() {
  error.value = ''
  loading.value = true

  await new Promise(r => setTimeout(r, 800))

  if (login(email.value, password.value)) {
    router.push('/home')
  } else {
    error.value = 'E-mail ou senha incorretos.'
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

      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 mb-6 shadow-lg shadow-blue-500/25">
          <PhFilmSlate weight="duotone" class="text-white" :size="28" />
        </div>
        <h1 class="font-heading text-2xl font-bold text-neutral-900 tracking-tight">Bem-vindo</h1>
        <p class="mt-1 text-neutral-500 text-sm">Acesse sua conta para continuar</p>
      </div>

      <form
        @submit.prevent="handleLogin"
        class="rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-xl shadow-black/5 border border-white/60 space-y-4"
      >
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

        <div
          v-if="error"
          class="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
        >
          {{ error }}
        </div>

        <div class="pt-2">
          <Button label="Entrar" type="submit" :loading="loading" />
        </div>

        <p class="text-center text-xs text-neutral-400">
          Não tem uma conta?
          <router-link to="/auth/register" class="text-blue-500 hover:text-blue-600 font-medium transition-colors">
            Criar conta
          </router-link>
        </p>
      </form>

      <p class="text-center text-xs text-neutral-400 mt-8">
        Demo: usuario@ticket.com / 123456
      </p>
    </div>
  </div>
</template>
