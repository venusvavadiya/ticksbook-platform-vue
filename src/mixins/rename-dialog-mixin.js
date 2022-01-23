export const renameDialogMixin = {
  data() {
    return {
      renameDialog: {
        showing: false,
        loading: false,
      },
    };
  },

  methods: {
    resetRenameDialog() {
      this.hideRenameDialog();
      this.stopRenameDialogLoading();
    },

    showRenameDialog() {
      this.renameDialog.showing = true;
    },

    hideRenameDialog() {
      this.renameDialog.showing = false;
    },

    startRenameDialogLoading() {
      this.renameDialog.loading = true;
    },

    stopRenameDialogLoading() {
      this.renameDialog.loading = false;
    },
  },
};
