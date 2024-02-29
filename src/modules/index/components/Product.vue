<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import {useAuthStore} from "{modules}/auth/stores/authStore";
// @ts-ignore
import {Product} from "{modules}/index/stores/productStore";
// @ts-ignore
import productController from "{modules}/index/controllers/productController";

export default defineComponent({
  name: "Product",
  props: {
    product: Object as () => Product
  },
  data() {
    return {
      authStore: useAuthStore(),
      preparingBuy: false
    }
  },
  methods: {
    buy(product: Number): void {
      this.preparingBuy = true;
      productController.buyProduct(product).finally(() => this.preparingBuy = false);
    }
  }
});
</script>

<template>
  <li class="product">
    <div class="product__image">
      <img alt="{{product.name}}" src="{img}/product-image.png">
    </div>
    <div class="product__info">
      <div class="product__top">
        <div class="product__name">{{ product.name }}</div>
        <div class="product__category">{{ product.category }}</div>
      </div>
      <div class="product__description">{{ product.description }}</div>
      <div class="product__buy">
        <div class="product__price">От {{ product.price }} р.</div>
        <button :disabled="!product.buyable || this.preparingBuy" class="product__action button-solid-blue" type="button"
                @click="buy(product.id)">Приобрести
        </button>
      </div>
    </div>
  </li>
</template>