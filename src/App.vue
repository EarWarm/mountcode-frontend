<script setup>
import '{scss}/index.scss';

import TheHeader from "{components}/TheHeader.vue";
import TheFooter from "{components}/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <RouterView />
  <TheFooter />
</template>
