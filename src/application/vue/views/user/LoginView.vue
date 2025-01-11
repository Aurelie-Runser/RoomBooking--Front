<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/infrastructure/auth/authService'
import type { loginRequestModel } from '@/domain/models/loginRequestModel'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '../../components/ErrorMessageComp.vue'

const router = useRouter()

const loginRequest = ref<loginRequestModel>({
  email: '',
  password: '',
})

const loading = ref<boolean>(false)
const logError = ref<string>('')

const loginFunction = async () => {
  logError.value = ''
  loading.value = true

  try {
    await Login(loginRequest.value)
    router.push('/profil')
  } catch (error) {
    logError.value = error
  }

  loading.value = false
}
</script>

<template>
  <main class="h-[200vh]">
    <h1 class="text-4xl font-bold text-center my-4">Connexion</h1>

    <form
      @submit.prevent="loginFunction"
      class="flex flex-col w-80 mx-auto gap-4"
    >
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

      <IconLoading v-else />

      <RouterLink to="/register">Je n'ai pas de compte</RouterLink>

      <div v-if="logError.length > 0">
        <ErrorMessage>
          {{ logError }}
        </ErrorMessage>
      </div>
    </form>
  </main>
</template>
