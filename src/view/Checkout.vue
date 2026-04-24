<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  PhTicket,
  PhCreditCard,
  PhQrCode,
  PhBarcode,
  PhCheckCircle,
  PhCopy,
  PhLock,
  PhShieldCheck,
  PhCalendar,
  PhMapPin,
  PhArmchair,
  PhFilmSlate,
  PhSpinner,
  PhArrowRight,
  PhHouse,
} from '@phosphor-icons/vue'
import { getEventById } from '../mocks/events'
import { addTicket } from '../mocks/tickets'
import type { Event } from '../mocks/events'
import EventDetailHeader from '../components/layout/EventDetailHeader.vue'
import Footer from '../components/layout/Footer.vue'
import Input from '../components/ui/Input.vue'

const route = useRoute()
const router = useRouter()

const event = ref<Event | null>(null)
const selectedSeats = ref<string[]>([])
const selectedCategory = ref('')
const step = ref<'payment' | 'processing' | 'success'>('payment')
const paymentMethod = ref<'pix' | 'card' | 'boleto'>('pix')
const isProcessing = ref(false)
const orderId = ref('')
const pixCopied = ref(false)
const boletoCopied = ref(false)

// Formulário de cartão
const cardNumber = ref('')
const cardHolder = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const cardType = ref<'credit' | 'debit'>('credit')

const categoryData = computed(() =>
  event.value?.categories.find(c => c.id === selectedCategory.value)
)

const totalPrice = computed(() =>
  (categoryData.value?.price ?? 0) * selectedSeats.value.length
)

const formattedDate = computed(() => {
  if (!event.value) return ''
  return new Date(event.value.date).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

// Código PIX mockado (formato real simplificado)
const pixCode = computed(() =>
  `00020126580014BR.GOV.BCB.PIX013600000000-0000-0000-0000-00000000000052040000530398654${String(totalPrice.value * 100).padStart(10, '0')}5802BR5920Cinematica6009SAO PAULO62070503***6304ABCD`
)

// Código de boleto mockado
const boletoCode = computed(() => {
  const base = String(Date.now()).slice(-10)
  return `23793.38128 60007.827136 00000.000003 1 ${base}${String(totalPrice.value * 100).padStart(8, '0')}`
})

function formatCardNumber(e: InputEvent) {
  const input = e.target as HTMLInputElement
  cardNumber.value = input.value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
    .slice(0, 19)
}

function formatExpiry(e: InputEvent) {
  const input = e.target as HTMLInputElement
  cardExpiry.value = input.value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .slice(0, 5)
}

async function confirmPayment() {
  step.value = 'processing'
  isProcessing.value = true

  await new Promise(resolve => setTimeout(resolve, 2200))

  orderId.value = 'TK-' + Math.random().toString(36).slice(2, 10).toUpperCase()

  addTicket({
    id: orderId.value,
    eventId: event.value!.id,
    userId: 1,
    category: selectedCategory.value,
    seats: selectedSeats.value,
    price: totalPrice.value,
    purchaseDate: new Date(),
    qrCode: `QR-${orderId.value}`,
  })

  isProcessing.value = false
  step.value = 'success'
}

function copyToClipboard(text: string, type: 'pix' | 'boleto') {
  navigator.clipboard.writeText(text).catch(() => {})
  if (type === 'pix') {
    pixCopied.value = true
    setTimeout(() => { pixCopied.value = false }, 2000)
  } else {
    boletoCopied.value = true
    setTimeout(() => { boletoCopied.value = false }, 2000)
  }
}

const isCardValid = computed(() =>
  cardNumber.value.replace(/\s/g, '').length === 16 &&
  cardHolder.value.trim().length >= 3 &&
  cardExpiry.value.length === 5 &&
  cardCvv.value.length >= 3
)

const canConfirm = computed(() => {
  if (paymentMethod.value === 'card') return isCardValid.value
  return true
})

onMounted(() => {
  const id = Number(route.query.eventId)
  event.value = getEventById(id) ?? null
  selectedSeats.value = (route.query.seats as string ?? '').split(',').filter(Boolean)
  selectedCategory.value = route.query.category as string ?? ''
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <EventDetailHeader />

    <!-- Estado: Processando -->
    <Transition name="fade-up">
      <div
        v-if="step === 'processing'"
        class="fixed inset-0 z-50 flex items-center justify-center"
        style="background: rgba(245,245,247,0.92); backdrop-filter: blur(20px);"
      >
        <div class="text-center">
          <div class="w-20 h-20 rounded-3xl bg-blue-500 flex items-center justify-center mx-auto mb-6">
            <PhSpinner weight="bold" class="text-white animate-spin" :size="36" />
          </div>
          <h2 class="font-heading text-2xl font-bold text-neutral-900 mb-2">Processando pagamento</h2>
          <p class="text-neutral-500 text-sm">Aguarde, estamos confirmando sua compra...</p>
        </div>
      </div>
    </Transition>

    <!-- Estado: Sucesso -->
    <Transition name="fade-up">
      <div v-if="step === 'success'" class="pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 min-h-screen flex items-center justify-center">
        <div class="max-w-md w-full text-center">

          <!-- Ícone de sucesso -->
          <div class="w-20 md:w-24 h-20 md:h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <PhCheckCircle weight="duotone" class="text-green-500" :size="44" />
          </div>

          <h1 class="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Compra confirmada!</h1>
          <p class="text-neutral-500 text-xs md:text-sm mb-1">Seu pedido foi processado com sucesso.</p>
          <p class="text-xs text-neutral-400 mb-6 md:mb-8">Número do pedido: <span class="font-mono font-semibold text-neutral-600">{{ orderId }}</span></p>

          <!-- Resumo do ingresso -->
          <div
            class="rounded-2xl p-5 mb-6 text-left"
            style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
          >
            <div class="flex items-start gap-4">
              <img
                v-if="event"
                :src="event.poster"
                :alt="event.title"
                class="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <p class="font-heading font-bold text-neutral-900 text-base truncate">{{ event?.title }}</p>
                <p class="text-xs text-neutral-500 mt-0.5">{{ formattedDate }} · {{ event?.time }}</p>
                <p class="text-xs text-neutral-500">{{ event?.location }}</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div class="text-xs text-neutral-500">
                <span class="font-medium text-neutral-700">{{ selectedSeats.length }}</span> assento(s) ·
                <span class="font-medium text-neutral-700">{{ categoryData?.name }}</span>
              </div>
              <p class="font-heading font-bold text-neutral-900 text-lg">R$ {{ totalPrice.toFixed(2) }}</p>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex flex-col gap-3">
            <button
              @click="router.push(`/ticket/${orderId}`)"
              class="w-full py-3.5 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PhTicket weight="duotone" :size="18" />
              Ver meu ingresso digital
            </button>
            <button
              @click="router.push('/home')"
              class="w-full py-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 active:scale-[0.98] text-neutral-700 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PhHouse weight="duotone" :size="18" />
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Estado: Pagamento -->
    <div v-if="step === 'payment' && event" class="pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6">
      <div class="max-w-5xl mx-auto">

        <div class="mb-6">
          <h1 class="font-heading text-xl md:text-2xl font-bold text-neutral-900">Finalizar compra</h1>
          <p class="text-xs md:text-sm text-neutral-500 mt-1">Escolha a forma de pagamento e confirme seu pedido</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <!-- Coluna principal: Pagamento -->
          <div class="lg:col-span-2 space-y-4">

            <!-- Seleção de método -->
            <div
              class="rounded-2xl overflow-hidden"
              style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
            >
              <div class="px-4 md:px-6 py-3 md:py-4 border-b border-neutral-100">
                <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Forma de pagamento</p>
              </div>

              <div class="p-3 md:p-4 flex gap-2 md:gap-3">
                <button
                  v-for="method in [
                    { id: 'pix', label: 'PIX', icon: PhQrCode },
                    { id: 'card', label: 'Cartão', icon: PhCreditCard },
                    { id: 'boleto', label: 'Boleto', icon: PhBarcode },
                  ]"
                  :key="method.id"
                  @click="paymentMethod = method.id as 'pix' | 'card' | 'boleto'"
                  class="flex-1 flex flex-col items-center gap-1 md:gap-2 py-3 md:py-4 px-2 rounded-lg md:rounded-xl border text-xs md:text-sm font-medium transition-all duration-200 min-h-[44px]"
                  :class="paymentMethod === method.id
                    ? 'bg-blue-500 border-blue-500 text-white '
                    : 'bg-white border-neutral-200 text-neutral-600'"
                >
                  <component :is="method.icon" weight="duotone" :size="20" />
                  {{ method.label }}
                </button>
              </div>
            </div>

            <!-- PIX -->
            <Transition name="method-fade" mode="out-in">
              <div
                v-if="paymentMethod === 'pix'"
                key="pix"
                class="rounded-2xl overflow-hidden"
                style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
              >
                <div class="px-6 py-4 border-b border-neutral-100">
                  <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Pagamento via PIX</p>
                </div>

                <div class="p-6 flex flex-col items-center gap-6">
                  <!-- QR Code mockado -->
                  <div class="p-4 bg-white rounded-2xl border border-neutral-100 ">
                    <div class="w-44 h-44 relative" aria-label="QR Code PIX">
                      <!-- Grid pattern simulando QR code -->
                      <svg viewBox="0 0 200 200" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="white"/>
                        <!-- Cantos QR -->
                        <rect x="10" y="10" width="50" height="50" rx="4" fill="none" stroke="#111" stroke-width="8"/>
                        <rect x="20" y="20" width="30" height="30" rx="2" fill="#111"/>
                        <rect x="140" y="10" width="50" height="50" rx="4" fill="none" stroke="#111" stroke-width="8"/>
                        <rect x="150" y="20" width="30" height="30" rx="2" fill="#111"/>
                        <rect x="10" y="140" width="50" height="50" rx="4" fill="none" stroke="#111" stroke-width="8"/>
                        <rect x="20" y="150" width="30" height="30" rx="2" fill="#111"/>
                        <!-- Dados centrais simulados -->
                        <rect x="75" y="10" width="50" height="8" rx="2" fill="#111"/>
                        <rect x="75" y="24" width="30" height="8" rx="2" fill="#111"/>
                        <rect x="115" y="24" width="10" height="8" rx="2" fill="#111"/>
                        <rect x="75" y="38" width="50" height="8" rx="2" fill="#111"/>
                        <rect x="10" y="75" width="8" height="50" rx="2" fill="#111"/>
                        <rect x="24" y="75" width="8" height="30" rx="2" fill="#111"/>
                        <rect x="38" y="75" width="8" height="50" rx="2" fill="#111"/>
                        <rect x="75" y="75" width="50" height="50" rx="4" fill="#111"/>
                        <rect x="83" y="83" width="34" height="34" rx="2" fill="white"/>
                        <rect x="91" y="91" width="18" height="18" rx="1" fill="#111"/>
                        <rect x="140" y="75" width="8" height="50" rx="2" fill="#111"/>
                        <rect x="154" y="75" width="8" height="30" rx="2" fill="#111"/>
                        <rect x="168" y="75" width="8" height="50" rx="2" fill="#111"/>
                        <rect x="75" y="140" width="50" height="8" rx="2" fill="#111"/>
                        <rect x="75" y="154" width="20" height="8" rx="2" fill="#111"/>
                        <rect x="105" y="154" width="20" height="8" rx="2" fill="#111"/>
                        <rect x="75" y="168" width="50" height="8" rx="2" fill="#111"/>
                        <rect x="140" y="140" width="50" height="8" rx="2" fill="#111"/>
                        <rect x="140" y="154" width="20" height="8" rx="2" fill="#111"/>
                        <rect x="170" y="154" width="20" height="8" rx="2" fill="#111"/>
                        <rect x="140" y="168" width="50" height="8" rx="2" fill="#111"/>
                      </svg>
                    </div>
                  </div>

                  <div class="text-center">
                    <p class="text-sm font-semibold text-neutral-700 mb-1">Escaneie com seu app bancário</p>
                    <p class="text-xs text-neutral-400">O pagamento é confirmado em segundos</p>
                  </div>

                  <!-- Código copiável -->
                  <div class="w-full">
                    <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Ou copie o código</p>
                    <div class="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <p class="flex-1 text-xs font-mono text-neutral-600 truncate">{{ pixCode }}</p>
                      <button
                        @click="copyToClipboard(pixCode, 'pix')"
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-shrink-0"
                        :class="pixCopied ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'"
                      >
                        <PhCopy weight="duotone" :size="13" />
                        {{ pixCopied ? 'Copiado!' : 'Copiar' }}
                      </button>
                    </div>
                    <p class="text-xs text-neutral-400 mt-2">⏱ Código válido por 30 minutos</p>
                  </div>

                  <button
                    @click="confirmPayment"
                    class="w-full py-3.5 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PhCheckCircle weight="duotone" :size="18" />
                    Já realizei o pagamento
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Cartão -->
            <Transition name="method-fade" mode="out-in">
              <div
                v-if="paymentMethod === 'card'"
                key="card"
                class="rounded-2xl overflow-hidden"
                style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
              >
                <div class="px-6 py-4 border-b border-neutral-100">
                  <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Dados do cartão</p>
                </div>

                <div class="p-6 space-y-4">

                  <!-- Tipo: crédito / débito -->
                  <div class="flex gap-2">
                    <button
                      @click="cardType = 'credit'"
                      class="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200"
                      :class="cardType === 'credit' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-neutral-200 text-neutral-600'"
                    >Crédito</button>
                    <button
                      @click="cardType = 'debit'"
                      class="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200"
                      :class="cardType === 'debit' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-neutral-200 text-neutral-600'"
                    >Débito</button>
                  </div>

                  <!-- Número do cartão -->
                  <div>
                    <div class="relative">
                      <Input
                        label="NÚMERO DO CARTÃO"
                        :value="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                        inputmode="numeric"
                        :icon="PhCreditCard"
                        @input="formatCardNumber"
                      />
                    </div>
                  </div>

                  <!-- Nome no cartão -->
                  <Input
                    label="NOME IMPRESSO NO CARTÃO"
                    v-model="cardHolder"
                    placeholder="NOME SOBRENOME"
                  />

                  <!-- Validade + CVV -->
                  <div class="grid grid-cols-2 gap-3">
                    <Input
                      label="VALIDADE"
                      :value="cardExpiry"
                      placeholder="MM/AA"
                      maxlength="5"
                      inputmode="numeric"
                      @input="formatExpiry"
                    />
                    <Input
                      label="CVV"
                      v-model="cardCvv"
                      type="password"
                      placeholder="123"
                      maxlength="4"
                      inputmode="numeric"
                      :icon="PhLock"
                    />
                  </div>

                  <!-- Segurança -->
                  <div class="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                    <PhShieldCheck weight="duotone" class="text-green-500 flex-shrink-0" :size="16" />
                    <p class="text-xs text-neutral-500">Pagamento seguro com criptografia SSL de 256-bit</p>
                  </div>

                  <button
                    @click="confirmPayment"
                    :disabled="!canConfirm"
                    class="w-full py-3.5 bg-blue-500 hover:bg-blue-600 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PhLock weight="duotone" :size="16" />
                    Pagar R$ {{ totalPrice.toFixed(2) }}
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Boleto -->
            <Transition name="method-fade" mode="out-in">
              <div
                v-if="paymentMethod === 'boleto'"
                key="boleto"
                class="rounded-2xl overflow-hidden"
                style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
              >
                <div class="px-6 py-4 border-b border-neutral-100">
                  <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Boleto bancário</p>
                </div>

                <div class="p-6 space-y-5">

                  <!-- Visual do boleto -->
                  <div class="p-5 bg-white rounded-xl border border-neutral-100">
                    <!-- Barras simuladas -->
                    <div class="flex gap-px mb-4" aria-hidden="true">
                      <template v-for="i in 60" :key="i">
                        <div
                          class="flex-1 rounded-sm"
                          :class="i % 7 === 0 ? 'h-10 bg-neutral-800' : i % 3 === 0 ? 'h-8 bg-neutral-700' : 'h-10 bg-neutral-900'"
                          :style="{ width: i % 5 === 0 ? '3px' : '2px' }"
                        />
                      </template>
                    </div>
                    <p class="text-xs font-mono text-neutral-600 text-center leading-relaxed break-all">{{ boletoCode }}</p>
                  </div>

                  <!-- Copiar código -->
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">Linha digitável</p>
                    <div class="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <p class="flex-1 text-xs font-mono text-neutral-600 truncate">{{ boletoCode }}</p>
                      <button
                        @click="copyToClipboard(boletoCode, 'boleto')"
                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-shrink-0"
                        :class="boletoCopied ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'"
                      >
                        <PhCopy weight="duotone" :size="13" />
                        {{ boletoCopied ? 'Copiado!' : 'Copiar' }}
                      </button>
                    </div>
                  </div>

                  <!-- Aviso de prazo -->
                  <div class="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <PhBarcode weight="duotone" class="text-amber-500 flex-shrink-0 mt-0.5" :size="18" />
                    <div class="text-xs text-amber-700 leading-relaxed">
                      <p class="font-semibold mb-0.5">Vencimento em 3 dias úteis</p>
                      <p>Após o pagamento, a confirmação pode levar até 2 dias úteis. Os ingressos são liberados automaticamente após confirmação.</p>
                    </div>
                  </div>

                  <button
                    @click="confirmPayment"
                    class="w-full py-3.5 bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <PhArrowRight weight="bold" :size="16" />
                    Gerar boleto
                  </button>
                </div>
              </div>
            </Transition>

          </div>

          <!-- Sidebar: Resumo do pedido -->
          <div class="space-y-4">

            <div
              class="rounded-2xl overflow-hidden sticky top-24"
              style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.6); "
            >
              <div class="px-5 py-4 border-b border-neutral-100">
                <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Resumo do pedido</p>
              </div>

              <!-- Evento -->
              <div class="p-5">
                <div class="flex gap-3 mb-4">
                  <img
                    :src="event.poster"
                    :alt="event.title"
                    class="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <p class="font-heading font-bold text-neutral-900 text-sm leading-tight truncate">{{ event.title }}</p>
                    <div class="flex items-center gap-1 mt-1">
                      <PhCalendar weight="duotone" class="text-neutral-400" :size="12" />
                      <p class="text-xs text-neutral-500 capitalize truncate">{{ formattedDate }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                      <PhMapPin weight="duotone" class="text-neutral-400" :size="12" />
                      <p class="text-xs text-neutral-500 truncate">{{ event.location }}</p>
                    </div>
                  </div>
                </div>

                <!-- Assentos -->
                <div class="space-y-2 py-4 border-t border-neutral-100">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 text-xs text-neutral-500">
                      <PhArmchair weight="duotone" class="text-neutral-400" :size="14" />
                      Categoria
                    </div>
                    <span class="text-xs font-semibold text-neutral-700">{{ categoryData?.name }}</span>
                  </div>
                  <div class="flex items-start justify-between gap-2">
                    <span class="text-xs text-neutral-500">Assentos</span>
                    <div class="flex flex-wrap gap-1 justify-end max-w-[140px]">
                      <span
                        v-for="seat in selectedSeats"
                        :key="seat"
                        class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-mono font-semibold"
                      >{{ seat }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-neutral-500">Preço unitário</span>
                    <span class="text-xs font-semibold text-neutral-700">R$ {{ categoryData?.price?.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Total -->
                <div class="pt-4 border-t border-neutral-100">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-neutral-500">Subtotal ({{ selectedSeats.length }}x)</span>
                    <span class="text-sm font-semibold text-neutral-900">R$ {{ totalPrice.toFixed(2) }}</span>
                  </div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-neutral-500">Taxa de serviço</span>
                    <span class="text-sm font-semibold text-green-600">Grátis</span>
                  </div>
                  <div class="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span class="font-heading font-bold text-neutral-900">Total</span>
                    <span class="font-heading font-bold text-xl text-neutral-900">R$ {{ totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <!-- Selos de segurança -->
              <div class="px-5 pb-5">
                <div class="flex items-center justify-center gap-4 pt-4 border-t border-neutral-100">
                  <div class="flex items-center gap-1.5 text-neutral-400">
                    <PhLock weight="duotone" :size="13" />
                    <span class="text-[10px] font-medium">Compra segura</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-neutral-400">
                    <PhShieldCheck weight="duotone" :size="13" />
                    <span class="text-[10px] font-medium">SSL 256-bit</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-neutral-400">
                    <PhFilmSlate weight="duotone" :size="13" />
                    <span class="text-[10px] font-medium">Cinematica</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Evento não encontrado -->
    <div v-if="step === 'payment' && !event" class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center px-6">
        <div class="w-16 h-16 rounded-3xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
          <PhTicket weight="duotone" class="text-neutral-300" :size="32" />
        </div>
        <h2 class="font-heading font-bold text-xl text-neutral-900 mb-2">Pedido não encontrado</h2>
        <p class="text-sm text-neutral-500 mb-6">Nenhum evento ou assento selecionado.</p>
        <button
          @click="router.push('/home')"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl transition-all duration-200"
        >
          <PhHouse weight="duotone" :size="16" />
          Ir para o início
        </button>
      </div>
    </div>

    <Footer v-if="step !== 'success'" />
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.method-fade-enter-active,
.method-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.method-fade-enter-from,
.method-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
