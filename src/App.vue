<script setup>
import { RouterView } from "vue-router";
import LayoutHeader from "@/layout/LayoutHeader.vue";
</script>

<template>
  <LayoutHeader></LayoutHeader>
  <div class="view-container">
    <Suspense timeout="0">
      <RouterView v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <keep-alive>
            <div>
              <component :is="Component" />
            </div>
          </keep-alive>
        </transition>
      </RouterView>
    </Suspense>
  </div>
</template>

<style scoped></style>
