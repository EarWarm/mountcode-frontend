<script lang="ts">
import {defineComponent} from 'vue';
import "{scss}/modules/profile/profile-products.scss";
// @ts-ignore
import ProfileProduct from "{modules}/profile/views/children/products/ProfileProduct.vue";
// @ts-ignore
import {useProfileStore} from "{modules}/profile/stores/profileStore";
// @ts-ignore
import profileController from "{modules}/profile/controllers/profileController";
// @ts-ignore
import VLoader from "{components}/v-loader.vue";

export default defineComponent({
  name: "ProfileProductList",
  components: {VLoader, ProfileProduct},
  data() {
    return {
      profileStore: useProfileStore(),
      loadingProducts: true
    }
  },
  mounted() {
    profileController.loadProducts().finally(() => this.loadingProducts = false);
  }
})
</script>

<template>
  <div class="profile-products">
    <div class="profile-products__title highlighted-title">Купленные товары</div>
    <ul class="profile-products__list" v-if="!loadingProducts && profileStore.getProducts.length > 0">
      <ProfileProduct v-for="product in profileStore.getProducts" :product="product"/>
    </ul>
    <v-loader v-else-if="loadingProducts"/>
  </div>
</template>
