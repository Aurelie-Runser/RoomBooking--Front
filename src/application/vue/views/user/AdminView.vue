<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { GetProfil } from '@/infrastructure/auth/authService'
// import { useRouter } from 'vue-router'

import { GetUsersAdmin, updateUsersAdmin } from '@/domain/services/userService'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { UsersAdmin } from '@/domain/models/User'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'

// const router = useRouter()

const token = localStorage.getItem('jwtToken')
const loading = ref(true)
const listUser = ref<UsersAdmin[]>()
const listUserFind = ref<boolean>()
const listUserSuccess = ref<string>('')
const listUserError = ref<string>('')

const updateUsersAdminFunction = async () => {
  listUserSuccess.value = ''
  listUserError.value = ''
  loading.value = true

  try {
    const response = await updateUsersAdmin(listUser.value!, token!)
    listUserSuccess.value = response
  } catch (error) {
    listUserError.value = error
  }

  loading.value = false
}

onMounted(async () => {
  try {
    listUser.value = await GetUsersAdmin(token!)
    listUserFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
    listUserError.value = error
  }
  loading.value = false
})
</script>

<template>
  <main v-if="!loading">
    <h1>Vue Administrateur</h1>

    <div v-if="listUserFind">
      <table class="border w-full max-w-screen-sm mx-auto">
        <thead class="bg-blue-50">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listUser" :key="user.id">
            <th>{{ user.id }}</th>
            <td>{{ user.lastname }}</td>
            <td>{{ user.firstname }}</td>
            <td>
              <select name="user-role" id="user-role" v-model="user.role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="!loading"
        @click="updateUsersAdminFunction"
        class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Mettre à jour
      </button>

      <IconLoading v-if="loading" />

      <div v-if="listUserSuccess" class="col-span-full">
        <SuccessMessage>{{ listUserSuccess }}</SuccessMessage>
      </div>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>

  <div v-if="listUserError" class="col-span-full">
    <ErrorMessage>{{ listUserError }} </ErrorMessage>
  </div>
</template>
