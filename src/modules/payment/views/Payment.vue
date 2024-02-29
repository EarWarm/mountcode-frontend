<template>
  <PopupFrame :is-active="modalActive" :on-close="onClose">
    <template v-slot:header>
      <div v-if="status" class="popup__title">Успешное пополнение</div>
      <div v-else class="popup__title">Ошибка при пополнении</div>
    </template>
    <template v-slot:body>
      <div class="form__group">
        <div class="form__input">
          <div v-if="status">
            Спасибо за поддержку нашего проекта!
            <p>Баланс будет начислен в течении минуты, если изменения баланса не произошло, то обновите страницу.</p>
            <p>Если после обновления страницы баланс не был начислен и прошло уже более 10-и минут, то сообщите об этом
              в нашу <a href="{{links.vk_group}}" target="_blank">группу Вконтакте</a></p>
          </div>
          <div v-else>
            Если вы видите это окно, значит при пополнении произошла ошибка и платёжная система вернула вас на на сайт.
            Попробуй пополнить баланс ещё раз, если результат не измениться, то сообщите об этом в нашу
            <a href="{{links.vk_group}}" target="_blank">группу Вконтакте</a>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="popup__footer-text">
        Возникли проблемы c пополнением баланса? Сообщите об этом в нашу <a href="{{links.vk_group}}" target="_blank">группу
        Вконтакте</a>, мы постараемся как можно быстрее решить проблему.
      </div>
    </template>
  </PopupFrame>
</template>


<script>
import PopupFrame from "{components}/popup/PopupFrame.vue";

export default {
  name: "Payment",
  props: {
    query: String
  },
  components: {
    PopupFrame
  },
  computed: {
    status() {
      return this.query == 'success';
    }
  },
  setup() {
    return {
      links: window.config.links
    }
  },
  data() {
    return {
      modalActive: true,
    }
  },
  methods: {
    onClose() {
      this.modalActive = false;
      this.$router.push({name: 'index'});
    }
  }
}

</script>