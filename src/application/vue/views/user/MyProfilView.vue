<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GetProfil } from '@/infrastructure/auth/authService'
import { useRouter } from 'vue-router'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { UserLog } from '@/domain/models/UserLog'
import ErrorMessage from '../../components/ErrorMessageComp.vue'

const router = useRouter()

const loading = ref(true)
const user = ref()
const userError = ref<string>('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await GetProfil(token)
    user.value = response
  } catch (error) {
    userError.value = error
  }
  loading.value = false
})

const LogoutFunction = () => {
  localStorage.removeItem('jwtToken')
  router.push('/')
}
</script>

<template>
  <main v-if="!loading">
    <div v-if="user" class="mx-10">
      <h1 class="text-4xl my-4">{{ user.firstname }} {{ user.lastname }}</h1>

      <p class="my-2">
        Email : <strong>{{ user.email }}</strong>
      </p>
      <p class="my-2">
        Entreprise : <strong>{{ user.company }}</strong>
      </p>
      <p class="my-2">
        Emploi : <strong>{{ user.job }}</strong>
      </p>

      <p class="my-2">
        Historique des reservations
        <strong class="text-red-600 uppercase">A venir</strong>
      </p>
      <p class="my-2">
        Salles favorites <strong class="text-red-600 uppercase">A venir</strong>
      </p>

      <button
        @click="LogoutFunction"
        class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Se déconnecter
      </button>
    </div>
    <div v-else>
      <ErrorMessage>{{ userError }} </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
