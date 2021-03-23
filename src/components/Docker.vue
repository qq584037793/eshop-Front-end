<template>
  <div class="docker">
    <div
      v-for="(item,index) in dockerList"
      :key="item.icon"
      :class="{docker__item:true,'docker__item--active':index===currentIndex}"
      class="docker__item"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  // docker__itemコードの簡易化
  setup () {
    const dockerList = [
      { icon: '&#xe600;', text: 'ホーム', to: { name: 'Home' } },
      { icon: '&#xe77e;;', text: '買い物かご', to: { name: 'CartList' } },
      { icon: '&#xe619;', text: '購入履歴', to: { name: 'OrderList' } },
      { icon: '&#xe608;', text: 'マイページ', to: { name: 'MyPage' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriable.scss';
// docker部分
.docker {
  box-sizing: border-box;
  display: flex;
  position: absolute;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.12rem;
  }
}
</style>
