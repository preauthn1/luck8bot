<template>
  <span class="icon" :style="{ fontSize: size, color: color }">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  size?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  size: '1em',
  color: 'currentColor'
})
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.icon svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
