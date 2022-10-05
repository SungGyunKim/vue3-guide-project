<script setup>
import { RouterView } from "vue-router";
import LayoutHeader from "@/layout/LayoutHeader.vue";
</script>

<template>
  <LayoutHeader></LayoutHeader>
  <Suspense timeout="0">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </Suspense>
</template>

<style scoped></style>
