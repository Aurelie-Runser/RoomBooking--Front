<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GetProfil } from '@/infrastructure/auth/authService'
import { useRouter } from 'vue-router'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { UserLog } from '@/domain/models/UserLog'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import UserUpdateForm from '@/application/vue/components/forms/UserUpdateForm.vue'
import UserDeleteForm from '@/application/vue/components/forms/UserDeleteForm.vue'

import ListeBookings from '@/application/vue/components/ListBookingsComp.vue'

const router = useRouter()

const loading = ref(true)
const user = ref<UserLog>()
const userError = ref<string>('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await GetProfil(token)
    user.value = response
  } catch (error) {
    userError.value = error
    localStorage.removeItem('jwtToken')
    router.push('/')
  }
  loading.value = false
})

const LogoutFunction = () => {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('isAdmin')
  router.push('/')
}
</script>

<template>
  <main v-if="!loading">
    <div v-if="user" class="mx-10">
      <h1 class="text-4xl font-bold text-center my-4">Votre Profil</h1>

      <div class="flex flex-wrap gap-x-4 gap-y-20">
        <UserUpdateForm :user="user" />
        <ListeBookings />
      </div>

      <br />
      <br />
      <br />

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

      <br />
      <br />

      <UserDeleteForm :userId="user.id" />
    </div>
    <div v-else>
      <ErrorMessage>{{ userError }} </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
