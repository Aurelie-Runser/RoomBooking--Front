<script setup lang="ts"></script>

<template>
  <nav class="sticky top-0">
    <ul class="p-4 flex justify-center items-center gap-6 border bg-blue-50">
      <li class="hover:text-blue-500">
        <RouterLink to="/">Accueil</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/rooms-list">Catalogue de Salles</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/login">Connexion</RouterLink>
      </li>
      <li class="hover:text-blue-500">
        <RouterLink to="/profil">Mon Profil</RouterLink>
      </li>
    </ul>
  </nav>
</template>
