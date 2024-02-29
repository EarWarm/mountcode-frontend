<script lang="ts">
// @ts-ignore
import '{scss}/modules/profile/profile-resources.scss';
import {defineComponent} from 'vue'
// @ts-ignore
import profileController from "{modules}/profile/controllers/profileController";
// @ts-ignore
import VLoader from "{components}/v-loader.vue";
// @ts-ignore
import {useProfileStore} from "{modules}/profile/stores/profileStore";

export default defineComponent({
  name: "ProfileResources",
  components: {VLoader},
  data() {
    return {
      profileStore: useProfileStore(),
      profileController: profileController,
      loadingResources: true,
      product: this.$route.params.product,
      downloadingResource: false
    }
  },
  methods: {
    download(product, uuid) {
      if (this.downloadingResource) {
        return
      }
      this.downloadingResource = true;
      profileController.downloadResource(product, uuid).finally(() => this.downloadingResource = false);
    }
  },
  mounted() {
    profileController.loadResources(this.product).finally(() => this.loadingResources = false);
  }
})
</script>

<template>
  <div class="profile-resources">
    <div class="profile-resources__title highlighted-title">Ресурсы товара #{{product}}</div>
    <div class="profile-resources__body" v-if="!loadingResources">
      <div class="profile-resources__archived" v-if="profileStore.isArchived()">Данный товар является архивным, в скором времени он может удалиться!</div>
      <table class="profile-resources__table">
        <thead class="profile-resources__thead">
        <tr>
          <th>Номер</th>
          <th>Имя</th>
          <th>Версия</th>
          <th>Изменения</th>
        </tr>
        </thead>
        <tbody class="profile-resources__tbody" v-if="profileStore.getResources.length > 0">
        <tr v-for="resource in profileStore.getResources" class="profile-resources__resource" @click="download(product, resource.uuid)">
          <td>{{resource.uuid}}</td>
          <td>{{resource.name}}</td>
          <td>{{resource.version}}</td>
          <td>{{resource.changelog}}</td>
        </tr>
        </tbody>
        <tbody class="profile-resources__tbody" v-else>
        <tr class="profile-resources__resource profile-resources__resource-empty">
          <td colspan="4">У товара пока что нет ресурсов, но они обещали, что поторопятся появиться!</td>
        </tr>
        </tbody>
      </table>
    </div>
    <v-loader v-else/>
  </div>
</template>