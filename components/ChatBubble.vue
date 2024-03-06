<script setup lang="ts">
withDefaults(
  defineProps<{
    position: "left" | "right";
  }>(),
  {
    position: "left",
  }
);
</script>

<template>
  <div class="flex" :class="{ 'justify-end': position === 'right' }">
    <div class="bg-zinc-200 px-2 py-1 rounded-xl">
      <slot />
    </div>
  </div>
</template>
