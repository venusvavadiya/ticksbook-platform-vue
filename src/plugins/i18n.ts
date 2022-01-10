import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    landing: {
      hero: {
        title: 'TicksBook',
        content: 'A sample application to track our Options Portfolio built using Clean Architecture, CQRS, and EventSourcing Patterns.',
      },
    },
  },
};

export default new VueI18n({
  locale: 'en',
  messages,
});
