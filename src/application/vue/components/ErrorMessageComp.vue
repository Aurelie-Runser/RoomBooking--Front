<template>
  <div>
    <p class="text-center m-6 p-4 bg-red-100 border border-red-500">
      <slot /> &#x1F61F;
    </p>

    <div class="flex justify-center gap-6">
      <RouterLink to="/" class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md">
        Accueil
      </RouterLink>
    </div>
  </div>
</template>
