<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ProfileProduct",
  props: {
    product: Object
  },
  methods: {
    redirect() {
      this.$router.push({ name: 'profile-product-resources', params: { product: this.product.id } });
    }
  }
})
</script>

<template>
<li class="profile-product" @click="redirect">
  <img src="{img}/news-image.png" alt="Изображение товара" class="profile-product__image">
  <div class="profile-product__info">
    <h2 class="profile-product__title">{{product.name}}</h2>
    <p class="profile-product__description">{{product.description}}</p>
  </div>
</li>
</template>