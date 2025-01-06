<script setup lang="ts">
import { ref } from 'vue'
import type { UserLog } from '@/domain/models/UserLog'
import { LoaderIcon } from 'lucide-vue-next'
import { Login } from '@/infrastructure/auth/authService'
import type { loginRequestModel } from '@/domain/models/loginRequestModel'

import ErrorMessage from '../../components/ErrorMessageComp.vue'

const loginRequest = ref<loginRequestModel>({
  email: '',
  password: '',
})

const userLog = ref<Partial<UserLog>>({})
const loading = ref<boolean>(false)
const logError = ref<string>('')

const loginFunction = async () => {
  logError.value = ''
  loading.value = true

  try {
    const response = await Login(loginRequest.value)
    userLog.value = response.user

    const token = response.token
    localStorage.setItem('jwtToken', token)
  } catch (error) {
    logError.value = error
  }

  loading.value = false
}
</script>

<template>
  <main class="h-[200vh]">
    <h1 class="text-4xl font-bold text-center my-4">Login</h1>

    <form @submit.prevent="loginFunction">
      <input
        type="email"
        v-model="loginRequest.email"
        placeholder="Votre email"
        class="border"
      />
      <input
        type="text"
        v-model="loginRequest.password"
        placeholder="Votre Mot de passe"
        class="border"
      />

      <button
        v-if="!loading"
        type="submit"
        class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Se connecter
      </button>

      <LoaderIcon v-else />

      <div v-if="logError.length > 0">
        <ErrorMessage>
          {{ logError }}
        </ErrorMessage>
      </div>
    </form>
  </main>
</template>
