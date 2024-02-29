<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="container-small footer__container">
        <div class="footer__info">
          <div class="footer__logo">
            <Logotype/>
          </div>
          <div class="footer__description">
            Наша студия - это творческий коллектив опытных программистов с глубоким пониманием современных технологий!
          </div>
        </div>
        <div class="footer__helpful helpful">
          <div class="helpful__title">Навигация</div>
          <ul class="helpful__links">
            <li class="helpful__link">
              <router-link :to="{name: 'index'}">Главная</router-link>
            </li>
          </ul>
        </div>
        <div class="footer__helpful helpful">
          <div class="helpful__title">Социальные сети</div>
          <ul class="helpful__links">
            <li class="helpful__link"><a :href="links.vk_group">Вконтакте</a></li>
            <li class="helpful__link"><a :href="links.discord">Дискорд</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__copyright">
      <div class="container-small">
        <div class="footer__date">© 2024-{{ new Date().getFullYear() }} MountCode</div>
        <div class="footer__author">Все элементы на странице защищены авторским правом.</div>
      </div>
    </div>
  </footer>
</template>

<script>
import "{scss}/modules/footer.scss";
import Logotype from "{components}/Logotype.vue";

export default {
  name: "TheFooter",
  components: {Logotype},
  setup() {
    return {
      links: window.config.links
    }
  }
}
</script>