<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('nml-auto ntext-xs ntracking-widest ntext-muted-foreground', props.class)">
    <slot />
  </span>
</template>
