<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const searchType = ref('all')

const handleSearch = (e: Event) => {
  if (searchQuery.value.length > 0) {
    e.preventDefault()
    router.push({
      path: '/rooms-list',
      query: { search: searchQuery.value, type: searchType.value },
    })
    searchQuery.value = ''
  }
}
</script>

<template>
  <nav
    class="sticky top-0 flex justify-between p-4 items-center gap-6 border bg-blue-50"
  >
    <ul class="flex justify-center items-center gap-6">
      <li class="hover:text-blue-500">
        <RouterLink to="/">Accueil</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/rooms-list">Catalogue de Salles</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/login">Connexion</RouterLink>
      </li>
      <li>
        <form @submit="handleSearch" class="flex gap-2">
          <div class="flex">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher une salle..."
              class="px-6 py-1 border rounded-l-md"
            />
            <select
              v-model="searchType"
              class="px-1 py-1 border rounded-r-md border-l-none"
            >
              <option value="all">Tout</option>
              <option value="name">Nom</option>
              <option value="location">Localisation</option>
              <option value="capacity">Capacité</option>
            </select>
          </div>
          <button
            type="submit"
            class="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-md"
          >
            <Search class="size-4" />
          </button>
        </form>
      </li>
    </ul>
    <ul class="flex gap-6">
      <li class="hover:text-blue-500">
        <RouterLink to="/register">Inscription</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/profil">Mon Profil</RouterLink>
      </li>
    </ul>
  </nav>
</template>
