<script lang="ts">
import Vue from 'vue';
import { VTextField } from 'vuetify/lib/components';

export default Vue.extend({
  extends: VTextField,

  props: {
    outlined: {
      type: Boolean,
      default: true,
    },

    hideDetails: {
      type: String,
      default: 'auto',
    },
  },
});
</script>
