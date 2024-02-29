<script lang="ts">
import {defineComponent} from 'vue'
// @ts-ignore
import Product from "{modules}/index/components/Product.vue";
// @ts-ignore
import {useProductStore} from "{modules}/index/stores/productStore";
// @ts-ignore
import productController from "{modules}/index/controllers/productController";
// @ts-ignore
import VLoader from "{components}/v-loader.vue";

export default defineComponent({
  name: "ProductList",
  components: {VLoader, Product},
  data() {
    return {
      productStore: useProductStore(),
      loadingCategories: true,
      loadingProducts: true,
      loadingMoreProducts: false
    }
  },
  mounted() {
    productController.loadCategories().finally(() => this.loadingCategories = false);
    this.productStore.setProducts([]);
    productController.loadProducts().finally(() => this.loadingProducts = false);
  },
  methods: {
    selectCategory(category: Number) {
      this.loadingProducts = true;
      this.productStore.setProducts([]);
      this.productStore.setSelectedCategory(category);
      this.productStore.setCurrentPage(null);
      this.productStore.setNextPage(false);
      productController.loadProducts().finally(() => this.loadingProducts = false);
    },
    moreProducts() {
      this.loadingMoreProducts = true;
      this.productStore.setCurrentPage(this.productStore.getCurrentPage + 1);
      productController.loadProducts().finally(() => this.loadingMoreProducts = false);
    },
    reset() {
      if (this.productStore.getSelectedCategory == null) {
        return
      }
      this.loadingProducts = true;
      this.productStore.setProducts([]);
      this.productStore.setSelectedCategory(null);
      this.productStore.setCurrentPage(null);
      this.productStore.setNextPage(false);
      productController.loadProducts().finally(() => this.loadingProducts = false);
    }
  }
})
</script>

<template>
  <div class="products">
    <div class="products__title">
      <div class="highlighted-title products__name" @click="reset">Товары</div>
      <ul class="products__categories" v-if="!loadingCategories">
        <li class="products__category" v-for="category in productStore.getProductCategories">
          <button type="button" class="button-bordered-inverted-gray" :disabled="category.id == productStore.getSelectedCategory" @click="selectCategory(category.id)">{{category.name}}</button>
        </li>
      </ul>
      <v-loader v-else/>
    </div>
    <div class="products__body" v-if="!loadingProducts">
      <ul class="products__list">
        <Product v-for="product in productStore.getProducts" :product="product" :key="product.id"/>
      </ul>
      <div class="products__more" v-if="!this.loadingMoreProducts && productStore.hasNextPage">
        <button class="button-solid-blue" type="button" @click="this.moreProducts">Больше товаров</button>
      </div>
      <v-loader v-if="this.loadingMoreProducts"/>
    </div>
    <v-loader v-else/>
  </div>
</template>