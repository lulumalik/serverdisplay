<template>
  <div class="Collapsible">
    <div class="flex items-center">
      <slot name="toggle" class="focus:outline-none"></slot>
      <button
        class="focus:outline-none"
        :class="{
          Collapsible__trigger: true,
          'Collapsible__trigger--open': !transitioning && open,
          'Collapsible__trigger--closed': !transitioning && !open,
          'Collapsible__trigger--transitioning': transitioning,
        }"
        @click="handleClick"
      >
        <slot name="trigger">
          <span class="Collapsible__triggerLabel">
            {{ !open ? closedLabel : openLabel }}
          </span>
        </slot>

        <!-- <slot name="closedTrigger" v-if="!open">
        <slot name="trigger">
          <span class="Collapsible__triggerLabel">{{
            !open ? closedLabel : openLabel
          }}</span>
        </slot>
      </slot> -->
      </button>
    </div>
    <div class="w-full">
      <div
        :class="{
          Collapsible__content: true,
          'Collapsible__content--open': !transitioning && open,
          'Collapsible__content--closed': !transitioning && !open,
          'Collapsible__content--transitioning': transitioning,
        }"
        :style="{
          height,
          transitionProperty: 'height',
          transitionDuration,
          transitionTimingFunction,
          transitionDelay,
        }"
        @transitionend="handleEnd"
      >
        <div ref="inner" class="Collapsible__contentInner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collapsible",
  props: {
    openLabel: {
      type: String,
      default: "Close me",
    },
    closedLabel: {
      type: String,
      default: "Open me",
    },
    transitionDuration: {
      type: String,
      default: "400ms",
    },
    transitionTimingFunction: {
      type: String,
      default: "ease",
    },
    transitionDelay: {
      type: String,
      default: "0s",
    },
    isOpen: {
      default: true,
      type: Boolean,
    },
    onCollapse: {
      default: () => {},
      type: Function,
    },
  },
  data() {
    return {
      open: this.isOpen,
      height: this.isOpen ? "auto" : "0px",
      closeOnNextTick: false,
      transitioning: false,
    };
  },
  watch: {
    open(newVal, oldVal) {
      this.transitioning = true;
      this.height = this.$refs.inner.scrollHeight + "px";
      if (oldVal === true) {
        this.closeOnNextTick = true;
      }
      this.$emit("atopen", newVal);
    },
    isOpen(newVal) {
      this.open = newVal;
    },
  },
  updated() {
    this.$nextTick(() => {
      window.setTimeout(() => {
        if (this.closeOnNextTick) {
          this.height = "0px";
          this.closeOnNextTick = false;
        }
      });
    });
  },
  methods: {
    handleClick() {
      this.onCollapse(!this.isOpen);
      this.open = !this.open;
    },
    handleEnd() {
      if (this.height !== "0px") {
        this.height = "auto";
      }
      this.transitioning = false;
    },
  },
};
</script>

<style scoped>
.Collapsible__content {
  overflow: hidden;
}
.Collapsible__contentInner {
  height: auto;
}
.Collapsible__trigger {
  appearance: none;
  border: 0;
  background: transparent;
  border-radius: 0;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  text-align: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  display: block;
  width: 100%;
  cursor: pointer;
}
</style>
