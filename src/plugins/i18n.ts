import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    heroTitle: 'TicksBook',
    heroContent: 'A sample application to track our Options Portfolio built using Clean Architecture, CQRS, and EventSourcing Patterns.',

    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    createOrderBook: 'Create Order Book',
    renameOrderBook: 'Rename Order Book',
    name: 'Name',
    done: 'Done',
    cancel: 'Cancel',
    rename: 'Rename',
    noData: 'No data',
    archive: 'Archive',
    addOrder: 'Add Order',
    unarchive: 'Unarchive',
    orderBook: 'Order Book',
    orderBooks: 'No Order Book | 1 Order Book | {count} Order Books',
  },
};

export default new VueI18n({
  locale: 'en',
  messages,
});
