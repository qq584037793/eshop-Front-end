<template>
  <div class="top">
    <div class="top_bgcol" />
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe618;</div>注文リスト
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">お届け先の住所</div>
      <div class="top__receiver__address">東京都板橋区4-23-1 コスモス101(仮)</div>
      <div class="top__receiver__info" v-for="item in data" :key="item._id">
        <span class="top__receiver__info__name">{{item.username}}さん</span>
      </div>
      <div class="iconfont top__receiver__icon">&#xe618;</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import { useRouter } from 'vue-router'

const getUserInfoEffect = () => {
  const data = ref([])
  const getUserInfo = async () => {
    const result = await get('/api/user')
    console.log(result.data)
    if (result?.errno === 0 && result?.data) {
      data.value = result.data
    }
  }
  return { getUserInfo, data }
}

const useBack = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'TopArea',
  setup () {
    const { getUserInfo, data } = getUserInfoEffect()
    const { handleBackClick } = useBack()
    getUserInfo()
    return { getUserInfo, data, handleBackClick }
  }

}
</script>

<style lang="scss" scoped>
@import '../../style/viriable.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(
    0deg,
    rgba(0, 145, 255, 0) 4%,
    $btn-bgColor 50%
  );
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      font-size: 0.22rem;
      left: 0.18rem;
    }
  }
  &__receiver {
    position: absolute;
    right: 0.18rem;
    left: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: 0.04rem;
    color: $content-fontcolor;
    &__title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0rem 0.4rem 0rem 0.16rem;
      font-size: 0.14rem;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        margin-right: 0.06rem;
        font-size: 0.12rem;
        line-height: 0.18rem;
        color: $medium-fontColor;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.55rem;
      color: $medium-fontColor;
      font-size: 0.2rem;
      transform: rotate(180deg);
    }
  }
}
</style>
