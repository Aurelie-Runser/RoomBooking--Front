<script setup lang="ts">
import { ref } from 'vue'
import type { UserLog } from '@/domain/models/UserLog'
import { UpdateUser } from '@/domain/services/userService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const props = defineProps<{
  user: UserLog
}>()

const loading = ref(false)
const user = ref<UserLog>({ ...props.user })
const updateError = ref<string>('')
const updateSucces = ref<string>('')

const updateFunction = async () => {
  updateError.value = ''
  loading.value = true

  try {
    const response = await UpdateUser(user.value!)
    user.value!.password = ''
    updateSucces.value = response
  } catch (error) {
    updateError.value = error
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="updateFunction"
    class="grid grid-cols-1 w-96 mx-auto gap-4"
  >
    <input
      type="text"
      v-model="user.lastname"
      placeholder="Votre Nom de famille *"
      required
      class="border"
    />

    <input
      type="text"
      v-model="user.firstname"
      placeholder="Votre Prénom"
      class="border"
    />

    <input
      type="email"
      v-model="user.email"
      placeholder="Votre email *"
      readonly
      class="border text-gray-600"
    />

    <input
      type="text"
      v-model="user.password"
      placeholder="Votre Mot de passe *"
      class="border"
    />

    <input
      type="text"
      v-model="user.company"
      placeholder="Votre Entreprise"
      class="border"
    />

    <input
      type="text"
      v-model="user.job"
      placeholder="Votre Poste"
      class="border"
    />

    <button
      v-if="!loading"
      type="submit"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Enregistrer les modifications
    </button>

    <IconLoading v-else />

    <div
      v-if="updateSucces.length > 0"
      class="text-center m-6 p-4 bg-green-100 border border-green-500"
    >
      <p>{{ updateSucces }}</p>
    </div>

    <div v-else-if="updateError.length > 0">
      <ErrorMessage>{{ updateError }}</ErrorMessage>
    </div>
  </form>
</template>
