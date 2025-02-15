<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = (e: Event) => {
  if (searchQuery.value.length > 0) {
    e.preventDefault()
    router.push({ path: '/rooms-list', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}
</script>

<template>
  <nav class="sticky top-0">
    <ul class="p-4 flex justify-center items-center gap-6 border bg-blue-50">
      <li class="hover:text-blue-500">
        <RouterLink to="/">Accueil</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/rooms-list">Catalogue de Salles</RouterLink>
      </li>
      <li>
        <form @submit="handleSearch" class="flex gap-2">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une salle..."
            class="px-3 py-1 border rounded-md"
          />

          <button
            type="submit"
            class="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-md"
          >
            Rechercher
          </button>
        </form>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/login">Connexion</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/register">Inscription</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/profil">Mon Profil</RouterLink>
      </li>
    </ul>
  </nav>
</template>
