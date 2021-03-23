<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message']
}
export const useToastEffect = () => {
  const toastDate = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastDate.show = true
    toastDate.toastMessage = message
    setTimeout(() => {
      toastDate.show = false
      toastDate.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastDate)
  return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped>
@import '../style/viriable.scss';
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.35);
  padding: 0.1rem;
  border-radius: 0.5rem;
  color: $bgColor;
}
</style>
