<script lang="ts">
import {DateTime} from 'luxon';
import '{scss}/modules/profile.scss';
// @ts-ignore
import Hero from "{components}/Hero.vue";
// @ts-ignore
import {useUserStore} from "{modules}/user/stores/userStore";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Profile",
  components: {
    Hero
  },
  data() {
    return {
      userStore: useUserStore()
    }
  },
  computed: {
    createdAt() {
      const dateTime = DateTime.fromISO(this.userStore.getUser.created_at);
      return dateTime.setLocale('ru').toFormat('d MMMM yyyy в HH:mm');
    },
    updatedAt() {
      const dateTime = DateTime.fromISO(this.userStore.getUser.created_at);
      return dateTime.setLocale('ru').toFormat('d MMMM yyyy в HH:mm');
    }
  }
})
</script>

<template>
<main class="main">
  <Hero class="container-large">
    <div class="profile">
      <div class="profile__header">
        Аккаунт: #{{userStore.getUser.id}}
      </div>
      <div class="profile__body">
        <div class="profile__data">
          <img src="{img}/profile-character.png" alt="Персонаж" class="profile__img">
          <ul class="profile__info">
            <li class="profile__field">
              Почта: {{userStore.getUser.email}}
            </li>
            <li class="profile__field">
              Баланс: {{userStore.getUser.balance}} руб.
            </li>
            <li class="profile__field">
              Дата регистрации: <time >{{createdAt}}</time>
            </li>
            <li class="profile__field">
              Дата последнего обновления: {{updatedAt}}
            </li>
          </ul>
        </div>
        <div class="profile__footer">
          <router-link :to="{name: 'profile-payment'}" class="button-solid-blue">Пополнение</router-link>
          <router-link :to="{name: 'profile-products'}" class="button-solid-blue">Товары</router-link>
          <router-link :to="{name: 'profile-change-password'}" class="button-solid-blue">Смена пароля</router-link>
        </div>
      </div>
    </div>
  </Hero>
  <RouterView class="container-small"/>
</main>
</template>

