<script lang="ts">
import Vue from 'vue';
import { VDialog } from 'vuetify/lib/components';

export default Vue.extend({
  extends: VDialog,

  props: {
    maxWidth: {
      type: [Number, String],
      default: 600,
    },

    persistent: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
