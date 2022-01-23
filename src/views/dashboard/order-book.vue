<template lang="pug">
  app-layout
    v-container(v-if="orderBook")
      order-book-detail-card(
        :is-archived="orderBook.isArchived"
        :name="orderBook.name"
        :orders="orderBook.orders"
        @click:archive="archiveOrderBook(orderBook.id)"
        @click:rename="renameClickHandler"
        @click:unarchive="unarchiveOrderBook(orderBook.id)"
      )

    v-container(v-else)
      p.text-center.my-12 {{ $t('noData') }}

    ui-dialog(v-model="renameDialog.showing")
      v-card(:loading="renameDialog.loading")
        v-card-title {{ $t('renameOrderBook') }}

        v-card-text
          v-form(@submit.prevent="renameDialogDoneHandler")
            rename-order-book-fields(:name.sync="renameField.name")

        ui-card-form-actions(
          :disabled="renameDialog.loading"
          @click:cancel="renameDialogCancelHandler"
          @click:done="renameDialogDoneHandler"
        )
</template>

<script>
// TODO: the following are uuids for the instruments
// 7300ab8c-835c-4310-9ab8-65d10555814f: HCLTECH22FEB1200PE
import Vue from 'vue';
import OrderBookDetailCard from '@/components/order-book-detail-card.vue';
import RenameOrderBookFields from '@/components/rename-order-book-fields.vue';
import { GQL_ORDER_BOOK } from '@/graphql/queries';
import { orderBookMutationMixin } from '@/mixins/order-book-mutation-mixin';
import { renameDialogMixin } from '@/mixins/rename-dialog-mixin';
import AppLayout from '@/layouts/app-layout.vue';

export default Vue.extend({
  components: {
    AppLayout,
    OrderBookDetailCard,
    RenameOrderBookFields,
  },

  mixins: [
    orderBookMutationMixin,
    renameDialogMixin,
  ],

  data() {
    return {
      renameField: {
        name: '',
      },
    };
  },

  apollo: {
    orderBook: {
      query: GQL_ORDER_BOOK,

      variables() {
        return { id: this.$route.params.id };
      },
    },
  },

  created() {
    this.$apollo.queries.orderBook.refetch();
  },

  methods: {
    renameClickHandler() {
      this.showRenameDialog();
      this.resetRenameField();
    },

    renameDialogCancelHandler() {
      this.resetRenameDialog();
      this.resetRenameField();
    },

    renameDialogDoneHandler() {
      this.startRenameDialogLoading();
      this.renameOrderBook(this.orderBook.id, this.renameField.name)
        .finally(() => {
          this.stopRenameDialogLoading();
          this.resetRenameDialog();
        });
    },

    resetRenameField() {
      this.renameField.name = this.orderBook.name;
    },
  },
});
</script>
