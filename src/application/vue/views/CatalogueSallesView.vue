<script setup lang="ts">
import type { Salle } from '@/domain/models/Salle'

import ListCard from '@/application/vue/components/ListCard.vue'

const listTestSalles: Salle[] = [
  {
    id: '1',
    slug: 'piece1',
    name: 'Pièce n°1',
    num: 1,
    picture: 'room1_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '2',
    slug: 'piece2',
    name: 'Pièce n°2',
    num: 2,
    picture: 'room2_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    accessible: false,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '3',
    slug: 'piece3',
    name: 'Pièce n°3',
    num: 3,
    picture: 'room3_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '4',
    slug: 'piece4',
    name: 'Pièce n°4',
    num: 4,
    picture: 'room4_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Détente',
    capacite: 10,
    superficie: '30x50',
    accessible: false,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
    ],
  },
  {
    id: '5',
    slug: 'piece5',
    name: 'Pièce n°5',
    num: 5,
    picture: 'room5_small',
    adress: '20 rue de la joie, 67100 Strasbourg',
    groupe: 'Réunion',
    capacite: 10,
    superficie: '30x50',
    accessible: true,
    surface: ['interieur', 'exterieur'],
    equipments: [
      { id: '1', name: 'chaise', nbr: 10 },
      { id: '2', name: 'tableau blanc', nbr: 1 },
      { id: '3', name: 'vidéo projecteur', nbr: 1 },
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
