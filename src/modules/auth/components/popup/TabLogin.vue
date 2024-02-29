<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="form__group">
      <div :class="{ 'form__input-error': v$.form.email.$error }" class="form__input">
        <label for="login">Введите почту</label>
        <input id="login" v-model="form.email" autocomplete="email" type="text">
      </div>
      <div :class="{ 'form__input-error': v$.form.password.$error }" class="form__input">
        <label for="auth_password">Введите пароль</label>
        <input id="auth_password" v-model="form.password" autocomplete="current-password" type="password">
      </div>
      <div class="form__actions">
        <button class="form__button-secondary" type="button" @click="selectTab('register')">Регистрация</button>
        <button :disabled="waitLoading" class="form__button-primary" type="submit">Авторизоваться</button>
      </div>
      <div class="form__actions">
        <a class="form__link" href="#" @click="selectTab('forgot-password')">Забыли пароль?</a>
        <a class="form__link" :href="links.vk_group" target="_blank">Помощь</a>
      </div>
    </div>
  </form>
</template>

<script>
import {useAuthStore} from "{modules}/auth/stores/authStore";
import {useVuelidate} from "@vuelidate/core";
import {email, helpers, required} from "@vuelidate/validators";
import authController from "{modules}/auth/controllers/authController";

export default {
  name: "TabLogin",
  props: {
    selectTab: Function
  },
  setup() {
    return {
      authStore: useAuthStore(),
      v$: useVuelidate(),
      links: window.config.links
    };
  },
  data() {
    return {
      waitLoading: false,
      form: {
        email: '',
        password: '',
        captcha: ''
      }
    }
  },
  methods: {
    async submit() {
      const validated = await this.v$.form.$validate();
      if (!validated) {
        for (let error of this.v$.form.$errors) {
          this.$toast.error(error.$message);
        }
        return;
      }

      this.waitLoading = true;
      await this.$recaptchaLoaded();
      this.form.captcha = await this.$recaptcha('login');

      authController.login(this.form).finally(() => this.waitLoading = false);
    }
  },
  validations() {
    return {
      form: {
        email: [
          helpers.withMessage('Вы должны указать почту', required),
          helpers.withMessage('Вы должны указать корректную почту', email)
        ],
        password: [
          helpers.withMessage('Вы должны указать пароль', required)
        ]
      },
    }
  }
}
</script>
