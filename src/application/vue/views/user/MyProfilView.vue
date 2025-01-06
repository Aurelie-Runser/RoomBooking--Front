<script setup lang="ts">
// import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()

// const loading = ref(true)

// onMounted(async () => {
//   try {
//   } catch (error) {
//     console.error('Erreur :', error)
//   }
//   loading.value = false
// })

const LogoutFunction = () => {
  localStorage.removeItem('jwtToken')
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Mon Profil</h1>
    <button
      @click="LogoutFunction"
      class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Se déconnecter
    </button>
  </main>
  <!-- <main v-if="!loading">
    coucou
  </main>

  <main v-else>
    <IconLoading />
  </main> -->
</template>
