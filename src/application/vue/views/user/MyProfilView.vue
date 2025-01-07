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
    <div v-if="user">
      {{ user }}

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
