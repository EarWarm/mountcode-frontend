<script>
import '{scss}/modules/header.scss';
import AuthorizationPopup from "{modules}/auth/components/AuthorizationPopup.vue";
import {useAuthStore} from "{modules}/auth/stores/authStore";
import MiniProfile from "{components}/header/MiniProfile.vue";
import Logotype from "{components}/Logotype.vue";

export default {
  name: "TheFooter",
  components: {Logotype, MiniProfile, AuthorizationPopup},
  setup() {
    return {
      links: window.config.links
    }
  },
  data() {
    return {
      authStore: useAuthStore()
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="header__left">
      <div class="header__logo">
        <router-link :to="{name: 'index'}">
          <Logotype/>
        </router-link>
      </div>
      <div class="header__links">
        <a class="header__link" :href="links.discord">
          <i class="icon icon-discord"></i>
          <span>Дискорд</span>
        </a>
        <a class="header__link"  :href="links.vk_group">
          <i class="icon icon-vkontakte"></i>
          <span>Вконтакте</span>
        </a>
      </div>
    </div>

    <div class="header__auth">
      <button v-if="!authStore.isLogged()" class="button-solid-blue" v-on:click="authStore.setModalActive(true)">Авторизация</button>
      <MiniProfile v-else />
    </div>

    <AuthorizationPopup/>
  </header>
</template>