<script lang="ts">
import {defineComponent} from 'vue'
import "{scss}/modules/profile/profile-change-password.scss";
// @ts-ignore
import profileController from "{modules}/profile/controllers/profileController";

export default defineComponent({
  name: "ProfileChangePassword",
  data() {
    return {
      waitChange: false,
      form: {
        'current_password': '',
        'password': '',
        'password_confirmation': '',
      }
    }
  },
  methods: {
    submit() {
      this.waitChange = true;
      profileController.changePassword(this.form).finally(() => this.waitChange = false);
    }
  }
})
</script>

<template>
<div class="profile-change-password">
  <div class="profile-change-password__title highlighted-title">Смена пароля</div>
  <form class="profile-change-password__form form">
    <div class="form__group">
      <div class="profile-change-password__input form__input">
        <label class="profile-change-password__label">Текущий пароль</label>
        <input v-model="form.current_password" autocomplete="current-password" type="password">
      </div>
      <div class="profile-change-password__input form__input">
        <label class="profile-change-password__label">Новый пароль</label>
        <input v-model="form.password" autocomplete="new-password" type="password">
      </div>
      <div class="profile-change-password__input form__input">
        <label class="profile-change-password__label">Подтверждение пароля</label>
        <input v-model="form.password_confirmation" autocomplete="new-password" type="password">
      </div>
      <button :disabled="waitChange" class="button-solid-blue profile-change-password__button" @click="submit">Изменить пароль</button>
    </div>
  </form>
</div>
</template>