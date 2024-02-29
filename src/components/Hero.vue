<script setup>
import '{scss}/modules/hero.scss';
</script>

<template>
  <div class="hero">
    <div class="hero__image">
      <img src="{img}/hero-image.png" alt="MountCode">
    </div>
    <slot/>
  </div>
</template>