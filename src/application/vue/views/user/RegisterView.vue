<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Register } from '@/infrastructure/auth/authService'
import type { registerRequestModel } from '@/domain/models/registerRequestModel'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '../../components/ErrorMessageComp.vue'

const router = useRouter()

const registerRequest = ref<registerRequestModel>({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  company: '',
  job: '',
})

const loading = ref<boolean>(false)
const resgiterError = ref<string>('')

const registerFunction = async () => {
  resgiterError.value = ''
  loading.value = true

  try {
    const response = await Register(registerRequest.value)
    const token = response.token
    localStorage.setItem('jwtToken', JSON.stringify(token))
    router.push('/profil')
  } catch (error) {
    resgiterError.value = error
  }

  loading.value = false
}
</script>

<template>
  <main class="h-[200vh]">
    <h1 class="text-4xl font-bold text-center my-4">Inscription</h1>

    <form
      @submit.prevent="registerFunction"
      class="grid grid-cols-2 w-96 mx-auto gap-4"
    >
      <input
        type="text"
        v-model="registerRequest.lastname"
        required
        placeholder="Votre Nom de famille *"
        class="border"
      />

      <input
        type="text"
        v-model="registerRequest.firstname"
        placeholder="Votre Prénom"
        class="border"
      />

      <input
        type="email"
        v-model="registerRequest.email"
        required
        placeholder="Votre email *"
        class="border"
      />

      <input
        type="text"
        v-model="registerRequest.password"
        required
        placeholder="Votre Mot de passe *"
        class="border"
      />

      <input
        type="text"
        v-model="registerRequest.company"
        placeholder="Votre Entreprise"
        class="border"
      />

      <input
        type="text"
        v-model="registerRequest.job"
        placeholder="Votre Poste"
        class="border"
      />

      <button
        v-if="!loading"
        type="submit"
        class="col-span-2 p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        S'inscrire
      </button>

      <IconLoading v-else />

      <RouterLink to="/login">J'ai déjà un compte</RouterLink>

      <div v-if="resgiterError.length > 0">
        <ErrorMessage>
          {{ resgiterError }}
        </ErrorMessage>
      </div>
    </form>
  </main>
</template>
