<script setup>
import '{scss}/modules/miniprofile.scss';

import {useUserStore} from "{modules}/user/stores/userStore";
import authController from "{modules}/auth/controllers/authController";
</script>

<template>
  <div class="mini-profile dropdown">
    <router-link :to="{name: 'profile'}" class="mini-profile__body">
      <div class="mini-profile__email">{{ useUserStore().getUser.email }}</div>
      <div ref="avatar" class="mini-profile__balance">{{ useUserStore().getUser.balance }} руб.</div>
    </router-link>
    <div class="dropdown__container">
      <div class="dropdown__menu menu">
        <ul class="menu__links">
          <li class="menu__link">
            <router-link :to="{name: 'profile'}">Личный кабинет</router-link>
          </li>
          <li class="menu__space"></li>
          <li class="menu__link" v-on:click="authController.logout()">Выйти</li>
        </ul>
      </div>
    </div>
  </div>
</template>