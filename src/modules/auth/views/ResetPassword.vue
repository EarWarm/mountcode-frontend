<template>
  <PopupFrame :is-active="modalActive" :on-close="onClose" class="authorization">
    <template v-slot:header>
      <div class="authorization__tabs">
        <a class="authorization__tab authorization__tab-active">Сброс пароля</a>
      </div>
    </template>
    <template v-slot:body>
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
            <input id="reg_password_repeat" v-model="form.password_confirmation" autocomplete="new-password" type="password">
          </div>
          <div class="form__actions">
            <button :disabled="waitLoading" class="form__button-primary" type="submit">Сбросить пароль</button>
          </div>
          <div class="form__actions">
            <a class="form__link" :href="links.vk_group" target="_blank">Помощь</a>
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      Возникли проблемы со сбросом пароля? Сообщите об этом в нашу <a href="{{links.vk_group}}" target="_blank">группу
      Вконтакте</a>, мы постараемся как можно быстрее решить проблему.
    </template>
  </PopupFrame>
</template>


<script>
import {email, helpers, maxLength, minLength, required, sameAs} from "@vuelidate/validators";
import authController from "{modules}/auth/controllers/authController";
import {useVuelidate} from "@vuelidate/core";
import PopupFrame from "{components}/popup/PopupFrame.vue";

export default {
  name: "ResetPassword",
  props: {
    token: String
  },
  components: {
    PopupFrame
  },
  setup() {
    return {
      v$: useVuelidate(),
      links: window.config.links
    }
  },
  data() {
    return {
      modalActive: true,
      waitLoading: false,
      form: {
        token: this.token,
        password: '',
        password_confirmation: '',
        email: ''
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
      this.form.recaptcha = await this.$recaptcha('resetPassword');

      authController.resetPassword(this.form)
          .then(response => {
            if (response.data.status) {
              this.onClose();
            }
          })
          .finally(() => this.waitLoading = false);
    },
    onClose() {
      this.modalActive = false;
      this.$router.push({name: 'index'});
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
          helpers.withMessage('Пароль не может быть больше 32-х символов', maxLength(32))
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