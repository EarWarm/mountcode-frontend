<template>
  <PopupFrame :is-active="authStore.isModalActive()" :on-close="onClose" class="authorization">
    <template v-slot:header>
      <div class="authorization__tabs">
        <a :class="{'authorization__tab-active': selectedTab === 'login'}"
           class="authorization__tab"
           v-on:click="selectTab('login')">
          Авторизация
        </a>
        <span>|</span>
        <a :class="{'authorization__tab-active': selectedTab === 'register'}"
           class="authorization__tab"
           v-on:click="selectTab('register')">
          Регистрация
        </a>
      </div>
    </template>
    <template v-slot:body>
      <keep-alive>
        <component :is="activeTab" :select-tab="selectTab"/>
      </keep-alive>
    </template>
    <template v-slot:footer>
      Возникли проблемы со входом? Сообщите об этом в нашу <a href="{{links.vk_group}}" target="_blank">группу
      Вконтакте</a>, мы постараемся как можно быстрее решить проблему.
    </template>
  </PopupFrame>
</template>

<script>
import {defineAsyncComponent} from "vue";
import PopupFrame from "{components}/popup/PopupFrame.vue";
import {useAuthStore} from "{modules}/auth/stores/authStore";
import '{scss}/modules/authorization.scss';

const TabRegister = defineAsyncComponent(() => import('{modules}/auth/components/popup/TabRegister.vue'));
const TabLogin = defineAsyncComponent(() => import('{modules}/auth/components/popup/TabLogin.vue'));
const TabForgotPassword = defineAsyncComponent(() => import('{modules}/auth/components/popup/TabForgotPassword.vue'));

export default {
  name: "AuthorizationPopup",
  components: {
    TabLogin,
    TabForgotPassword,
    TabRegister,
    PopupFrame,
  },
  setup() {
    return {
      authStore: useAuthStore(),
      links: window.config.links
    }
  },
  data() {
    return {
      selectedTab: 'login'
    }
  },
  computed: {
    activeTab() {
      if (this.selectedTab === 'register') {
        return TabRegister
      } else if (this.selectedTab === 'forgot-password') {
        return TabForgotPassword
      } else {
        return TabLogin
      }
    }
  },
  methods: {
    onClose() {
      this.authStore.setModalActive(false);
    },
    selectTab(tab) {
      this.selectedTab = tab;
    }
  }
}
</script>