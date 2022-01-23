<template lang="pug">
  app-layout
    v-container(v-if="orderBook")
      order-book-detail-card(
        :isArchived="orderBook.isArchived"
        :name="orderBook.name"
        :orders="orderBook.orders"
        @click:archive="archive"
        @click:rename="rename"
        @click:unarchive="unarchive"
      )

    v-container(v-else): p.text-center.my-12 {{ $t('noData') }}

    ui-dialog(v-model="renameDialog.show")
      v-card(:loading="renameDialog.loading")
        v-card-title {{ $t('renameOrderBook') }}

        v-card-text: v-form(@submit.prevent="doneRenameDialog")
          rename-order-book-fields(:name.sync="renameField.name")

        v-card-actions
          v-spacer
          v-btn(text :disabled="renameDialog.loading" @click="cancelRenameDialog") {{ $t('cancel') }}
          v-btn(text :disabled="renameDialog.loading" @click="doneRenameDialog") {{ $t('done') }}
</template>

<script>
// 7300ab8c-835c-4310-9ab8-65d10555814f: HCLTECH22FEB1200PE
import Vue from 'vue';
import OrderBookDetailCard from '@/components/order-book-detail-card.vue';
import RenameOrderBookFields from '@/components/rename-order-book-fields.vue';
import AppLayout from '@/layouts/app-layout.vue';
import { GQL_ORDER_BOOK } from '@/graphql/queries';
import {
  GQL_ARCHIVE_ORDER_BOOK,
  GQL_RENAME_ORDER_BOOK,
  GQL_UNARCHIVE_ORDER_BOOK,
} from '@/graphql/mutations';

export default Vue.extend({
  components: {
    AppLayout,
    OrderBookDetailCard,
    RenameOrderBookFields,
  },

  data() {
    return {
      renameDialog: {
        loading: false,
        show: false,
      },

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
    cancelRenameDialog() {
      this.resetRenameDialog();
    },

    async doneRenameDialog() {
      try {
        this.renameDialog.loading = true;
        const orderBookId = this.$route.params.id;
        const variables = { orderBookId, orderBookName: this.renameField.name };
        await this.$apollo.mutate({ mutation: GQL_RENAME_ORDER_BOOK, variables });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      } finally {
        this.resetRenameDialog();
      }
    },

    async archive() {
      const variables = { orderBookId: this.$route.params.id };
      await this.$apollo.mutate({ mutation: GQL_ARCHIVE_ORDER_BOOK, variables });
    },

    async unarchive() {
      const variables = { orderBookId: this.$route.params.id };
      await this.$apollo.mutate({ mutation: GQL_UNARCHIVE_ORDER_BOOK, variables });
    },

    rename() {
      this.renameDialog.show = true;
      this.renameField.name = this.orderBook.name;
    },

    resetRenameDialog() {
      this.renameDialog.loading = false;
      this.renameDialog.show = false;
      this.renameField.name = '';
    },
  },
});
</script>
