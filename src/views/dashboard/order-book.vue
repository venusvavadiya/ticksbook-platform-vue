<template lang="pug">
  app-layout
    v-container(v-if="orderBook")
      v-card
        v-card-title
          span {{ orderBook.name }}
          v-spacer

          v-menu(bottom left)
            template(#activator="{ on, attrs }")
              v-btn(icon v-bind="attrs" v-on="on"): v-icon mdi-dots-vertical

            v-list
              v-list-item(@click="showRenameDialog"): v-list-item-title {{ $t('rename') }}
              v-list-item(v-if="orderBook.isArchived" @click="unarchive"): v-list-item-title {{ $t('unarchive') }}
              v-list-item(v-else @click="archive"): v-list-item-title {{ $t('archive') }}

    v-container(v-else): p.text-center.my-12 {{ $t('noData') }}

    ui-dialog(v-model="renameDialog.show")
      v-card(:loading="renameDialog.loading")
        v-card-title {{ $t('renameOrderBook') }}

        v-card-text: v-form(@submit.prevent="doneRenameDialog")
          rename-order-book-fields(:name.sync="renameField.name")

        v-card-actions: v-spacer
          v-btn(text :disabled="renameDialog.loading" @click="cancelRenameDialog") {{ $t('cancel') }}
          v-btn(text :disabled="renameDialog.loading" @click="doneRenameDialog") {{ $t('done') }}
</template>

<script>
import Vue from 'vue';
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

    showRenameDialog() {
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
