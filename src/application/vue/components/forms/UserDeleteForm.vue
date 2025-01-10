<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { DeleteUser } from '@/domain/services/userService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()

const props = defineProps<{
  userId: number
}>()

const loading = ref(false)
const userId = ref<number>(props.userId)
const deleteError = ref<string>('')
const deleteSucces = ref<string>('')
const timerNumber = ref<number>(5)

const deleteUserFunction = async () => {
  deleteError.value = ''
  loading.value = true

  try {
    const response = await DeleteUser(userId.value!)
    deleteSucces.value = response

    const timer = setInterval(() => {
      timerNumber.value -= 1
      if (timerNumber.value <= 0) {
        clearInterval(timer)
        LogoutFunction()
      }
    }, 1000)
  } catch (error) {
    deleteError.value = error
  }

  loading.value = false
}

const LogoutFunction = () => {
  localStorage.removeItem('jwtToken')
  router.push('/')
}
</script>

<template>
  <button
    v-if="deleteSucces.length == 0"
    @click="deleteUserFunction"
    class="p-4 bg-red-200 hover:bg-red-300 rounded-md"
  >
    Supprimer mon compte
  </button>

  <IconLoading v-if="loading" />

  <div
    v-if="deleteSucces.length > 0"
    class="text-center m-6 p-4 bg-green-100 border border-green-500"
  >
    <p>
      {{ deleteSucces }}
      <br />
      Vous aller être rediriger vers la page d'accueil dans
      {{ timerNumber }} secondes.
    </p>
  </div>

  <div v-else-if="deleteError.length > 0">
    <ErrorMessage>{{ deleteError }}</ErrorMessage>
  </div>
</template>
