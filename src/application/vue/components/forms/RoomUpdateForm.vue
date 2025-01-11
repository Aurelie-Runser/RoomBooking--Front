<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Room } from '@/domain/models/Room'
import { GetRoomGroupe, UpdateRoom } from '@/domain/services/roomService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'

const props = defineProps<{
  roomProps: Room
}>()

const loading = ref(false)
const room = ref<Room>({ ...props.roomProps })
const roomGroupe = ref<string[]>()
const updateError = ref<string>('')
const updateSucces = ref<string>('')

onMounted(async () => {
  try {
    roomGroupe.value = await GetRoomGroupe()
  } catch (error) {
    console.error('Erreur :', error)
  }
})

const updateRoomFunction = async () => {
  updateError.value = ''
  updateSucces.value = ''
  loading.value = true

  try {
    const response = await UpdateRoom(room.value!)
    updateSucces.value = response
  } catch (error) {
    updateError.value = error
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="updateRoomFunction"
    class="grid grid-cols-1 w-96 mx-auto gap-4"
  >
    <input
      type="text"
      v-model="room.name"
      placeholder="Nom de la salle *"
      required
      class="border"
    />

    <input
      type="text"
      v-model="room.picture"
      placeholder="Image"
      class="border text-gray-600"
      disabled
    />

    <input
      type="text"
      v-model="room.adress"
      placeholder="Adresse *"
      required
      class="border"
    />

    <input
      type="text"
      v-model="room.adressComplements"
      placeholder="Complément d'adresse"
      class="border"
    />

    <select name="room-groupe" id="room-groupe" v-model="room.groupe">
      <option v-for="groupe in roomGroupe" :key="groupe" :value="groupe">
        {{ groupe }}
      </option>
    </select>

    <input
      type="number"
      v-model="room.capacity"
      placeholder="Capacité (Nombre de personne)"
      class="border"
    />

    <input
      type="number"
      v-model="room.area"
      placeholder="Surface"
      class="border"
    />

    <div class="flex gap-1">
      <input name="isAccessible" type="checkbox" v-model="room.isAccessible" />
      <label for="isAccessible">Accessible pour les handicapés</label>
    </div>

    <input
      type="text"
      v-model="room.surface"
      placeholder="Intérieur et/ou Exterieur"
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

    <div v-if="updateSucces.length > 0">
      <SuccessMessage>
        {{ updateSucces }}
      </SuccessMessage>
    </div>

    <div v-else-if="updateError.length > 0">
      <ErrorMessage>{{ updateError }}</ErrorMessage>
    </div>
  </form>
</template>
