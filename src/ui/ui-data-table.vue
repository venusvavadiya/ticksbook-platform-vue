<script lang="ts">
import Vue from 'vue';
import { VDataTable } from 'vuetify/lib/components';

export default Vue.extend({
  extends: VDataTable,

  props: {
    disableSort: {
      type: Boolean,
      default: true,
    },

    hideDefaultFooter: {
      type: Boolean,
      default: true,
    },

    itemsPerPage: {
      type: Number,
      default: -1,
    },

    mobileBreakpoint: {
      type: Number,
      default: 0,
    },
  },
});
</script>
