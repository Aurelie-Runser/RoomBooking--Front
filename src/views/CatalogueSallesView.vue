<script setup lang="ts">
import ListCard from '@/components/ListCard.vue'

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
</script>

<template>
  <main>
    <h1 class="text-4xl font-bold text-center my-4">Catalogue de Salles</h1>

    <ListCard :listSalles="listTestSalles" />
  </main>
</template>
