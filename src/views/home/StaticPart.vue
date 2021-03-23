<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe62a;</span>
    東京都板橋区4-23-1 コスモス101(仮)
    <span class="iconfont position__notice">&#xe625;</span>
  </div>
  <div class="search">
    <span class="iconfont search__icon">&#xe601;</span>
    <input class="search__text" placeholder="サム会員商店スペシャル商品" />
  </div>

  <div class="banner">
    <img class="banner__img" src="../../style/img/banner.png" alt />
  </div>

  <div class="icons">
    <div class="icons__item" v-for="item in iconList" :key="item.desc">
      <img class="icons__item__img" :src="item.iconName" />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconList = [
      { iconName: require('../../style/img/supermarket.png'), desc: 'スーパー' },
      { iconName: require('../../style/img/vegetable.png'), desc: '野菜' },
      { iconName: require('../../style/img/fruit.png'), desc: '果物' },
      { iconName: require('../../style/img/flower.png'), desc: '花' },
      { iconName: require('../../style/img/medicine.png'), desc: '薬' },
      { iconName: require('../../style/img/furniture.png'), desc: '家具' },
      { iconName: require('../../style/img/cake.png'), desc: 'ケーキ' },
      { iconName: require('../../style/img/jewelry.png'), desc: '宝石' }
    ]
    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriable.scss';
@import '../../style/mixins.scss';
.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    font-size: 0.2rem;
    right: 0;
    top: 0.17rem;
  }
}
// search部分
.search {
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  .iconfont {
    display: inline-block;
    padding: 0 0.08rem 0 0.16rem;
    font-size: 0.16rem;
  }
  &__text {
    display: inline-block;
    width: 60%;
    border: none;
    outline: none;
    background: none;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &::placeholder {
      color: $content-fontcolor;
    }
  }
}
// banner部分
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 22%;
  &__img {
    width: 100%;
    border-radius: 0.16rem;
  }
}
// icons部分
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.16rem;
  &__item {
    width: 25%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}
.gap {
  height: 0.1rem;
  margin: 0 -0.18rem;
  background: $content-bgColor;
}
</style>
