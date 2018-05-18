Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },

    mask: {
      type: Boolean,
      value: true
    },

    maskClosable: {
      type: Boolean,
      value: true
    },

    // 弹出方向
    type: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    handleMaskClick() {
      this.triggerEvent('clickMask', {});

      if (!this.data.maskClosable) {
        return;
      }
      this.triggerEvent('close', {});
    }
  }
});