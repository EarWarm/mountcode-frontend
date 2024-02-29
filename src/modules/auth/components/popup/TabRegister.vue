<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="form__group">
      <div :class="{ 'form__input-error': v$.form.email.$error }" class="form__input">
        <label for="reg_email">Введите ваш email</label>
        <input id="reg_email" v-model="form.email" autocomplete="email" type="email">
      </div>
      <div :class="{ 'form__input-error': v$.form.password.$error }" class="form__input">
        <label for="reg_password">Придумайте пароль</label>
        <input id="reg_password" v-model="form.password" autocomplete="new-password" type="password">
      </div>
      <div :class="{ 'form__input-error': v$.form.password_confirmation.$error }" class="form__input">
        <label for="reg_password_repeat">Повторите пароль</label>
        <input id="reg_password_repeat" v-model="form.password_confirmation" autocomplete="new-password"  type="password">
      </div>
      <div class="form__actions">
        <button class="form__button-secondary" type="button" v-on:click="selectTab('login')">Уже есть аккаунт</button>
        <button :disabled="waitLoading" class="form__button-primary" type="submit">Зарегистрироваться</button>
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
import authController from "{modules}/auth/controllers/authController";
import {email, helpers, maxLength, minLength, required, sameAs} from "@vuelidate/validators";

export default {
  name: "TabRegister",
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
        password_confirmation: '',
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
      this.form.captcha = await this.$recaptcha('register');

      authController.register(this.form).finally(() => this.waitLoading = false);
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
          helpers.withMessage('Придумайте пароль', required),
          helpers.withMessage('Пароль не может быть меньше 6 символов', minLength(6)),
        ],
        password_confirmation: [
          helpers.withMessage('Подтвердите придуманный пароль', required),
          helpers.withMessage('Пароли должны совпадать', sameAs(this.form.password))
        ]
      },
    }
  }
}
</script>
