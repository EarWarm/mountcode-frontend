<script lang="ts">
import {defineComponent} from 'vue';
import "{scss}/modules/profile/profile-payment.scss";
// @ts-ignore
import ProfilePaymentMethod from "{modules}/profile/views/children/payment/ProfilePaymentMethod.vue";
// @ts-ignore
import profileController from "{modules}/profile/controllers/profileController";

export default defineComponent({
  name: "ProfilePayment",
  computed: {
    profileController() {
      return profileController
    }
  },
  data() {
    return {
      waitingPayment: false,
      form: {
        payment_system: 'freekassa',
        coins: 25,
      }
    }
  },
  methods: {
    submit() {
      this.waitingPayment = true;
      profileController.payment(this.form).finally(() => this.waitingPayment = false);
    }
  }
})
</script>

<template>
<div class="profile-payment">
  <div class="profile-products__title highlighted-title">Пополнение баланса</div>
  <div class="profile-payment__body">
    <ul class="profile-payment__payment-methods">
      <li class="profile-payment__payment-method" @click="form.payment_system = 'freekassa'" :class="{'profile-payment__payment-method-active': form.payment_system == 'freekassa'}">
        <img src="{img}/freekassa.png" alt="FreeKassa">
      </li>
    </ul>
    <form class="profile-payment__details form" @submit.prevent="profileController.payment(form)">
      <div class="form__group">
        <div class="form__input">
          <label for="coins">Введите сумму пополнения (минимальная сумма 25 рублей)</label>
          <input id="coins" v-model="form.coins" autocomplete="transaction-amount" type="number">
        </div>
        <button class="button-solid-blue profile-payment__form-button" type="submit" :disabled="waitingPayment">Пополнить баланс</button>
      </div>
    </form>
  </div>
</div>
</template>
