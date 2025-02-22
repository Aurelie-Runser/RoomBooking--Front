<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Room } from '@/domain/models/Room'
import { GetRoomGroupe, AddRoom } from '@/domain/services/roomService'
import { usePictureUpload } from '@/application/vue/composables/usePictureUpload'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()
const loading = ref(false)
const room = ref<Room>({
  name: '',
  adress: '',
  adressComplements: '',
  groupe: '',
  capacity: '',
  area: '',
  isAccessible: false,
  surface: '',
})

const { pictureFile, errorPicture, handlePictureChange } = usePictureUpload()

const roomGroupe = ref<string[]>()
const addError = ref<string>('')

onMounted(async () => {
  try {
    roomGroupe.value = await GetRoomGroupe()
  } catch (error) {
    addError.value = error as string
  }
})

const addRoomFunction = async () => {
  addError.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('jwtToken')
    const response = await AddRoom({
      newRoom: room.value!,
      token: token!,
      pictureFile: pictureFile.value,
    })
    router.push(`/room/${response}`)
  } catch (error) {
    addError.value = error as string
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="addRoomFunction"
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
      type="file"
      accept="image/*"
      @change="handlePictureChange"
      class="border text-gray-600"
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
      placeholder="Capacité (Nombre de personnes) *"
      required
      class="border"
    />

    <input
      type="number"
      v-model="room.area"
      placeholder="Surface *"
      required
      class="border"
    />

    <div class="flex gap-1">
      <input name="isAccessible" type="checkbox" v-model="room.isAccessible" />
      <label for="isAccessible">Accessible pour les handicapés</label>
    </div>

    <input
      type="text"
      v-model="room.surface"
      placeholder="Intérieur et/ou Extérieur"
      class="border"
    />

    <button
      v-if="!loading"
      type="submit"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Créer
    </button>

    <IconLoading v-else />

    <div v-if="addError || errorPicture">
      <ErrorMessage>{{ addError || errorPicture }}</ErrorMessage>
    </div>
  </form>
</template>
