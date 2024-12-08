<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import IconLoading from '@/components/icons/IconLoading.vue'

const listTestSalles = [
  {
    slug: 'piece1',
    name: 'Pièce n°1',
    picture: 'room1_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    equipements: [
      { name: 'chaise', nbr: 10 },
      { name: 'tableau blanc', nbr: 1 },
      { name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    slug: 'piece2',
    name: 'Pièce n°2',
    picture: 'room2_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    equipements: [
      { name: 'chaise', nbr: 10 },
      { name: 'tableau blanc', nbr: 1 },
      { name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    slug: 'piece3',
    name: 'Pièce n°3',
    picture: 'room3_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    equipements: [
      { name: 'chaise', nbr: 10 },
      { name: 'tableau blanc', nbr: 1 },
      { name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    slug: 'piece4',
    name: 'Pièce n°4',
    picture: 'room4_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    equipements: [
      { name: 'chaise', nbr: 10 },
      { name: 'tableau blanc', nbr: 1 },
      { name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    slug: 'piece5',
    name: 'Pièce n°5',
    picture: 'room5_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    equipements: [
      { name: 'chaise', nbr: 10 },
      { name: 'tableau blanc', nbr: 1 },
      { name: 'vidéo projecteur', nbr: 1 },
    ],
  },
]

const route = useRoute()

const salle = ref(null)
const salleFind = ref(false)

onMounted(() => {
  salle.value = listTestSalles.find(salle => salle.slug == route.params.id)

  salleFind.value = true
})
</script>

<template>
  <main v-if="salleFind">
    <div v-if="salle">
      <h1 class="text-4xl font-bold text-center my-4">
        Reservation de {{ salle.name }}
      </h1>

      <div>
        <div>
          <label for="nomEvenement">Nom de l'évenement</label>
          <input
            type="text"
            id="nomEvenement"
            name="nomEvenement"
            placeholder="Réunion mensuel de l'entreprise A"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-center m-6 p-4 bg-red-100 border border-red-500">
        La salle que vous recherchez n'existe pas :&#40;
      </p>

      <div class="flex justify-center gap-6">
        <RouterLink to="/" class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
          Accueil
        </RouterLink>
        <RouterLink
          to="/catalogue-salles"
          class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
        >
          Catalogue des Salles
        </RouterLink>
      </div>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>
