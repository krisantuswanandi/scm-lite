<script setup lang="ts">
const messages = [
  { id: 1, message: "Message 1", position: "left" },
  { id: 2, message: "Message 2", position: "right" },
  { id: 3, message: "Message 3", position: "left" },
  { id: 4, message: "Message 4", position: "right" },
  { id: 5, message: "Message 5", position: "right" },
];
</script>

<template>
  <div class="max-w-[400px] m-auto">
    <div class="border-x h-dvh overflow-auto p-4 flex flex-col gap-1">
      <ChatBubble v-for="m in messages" :key="m.id" :position="m.position">
        {{ m.message }}
      </ChatBubble>
    </div>
  </div>
</template>
