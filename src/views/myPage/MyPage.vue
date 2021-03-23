<template>
  <div class="wrapper">
    <div class="top">
      <img class="top__img" src="../../style/img/avatar.jpg" alt />
      <div class="top__content" v-for="item in data" :key="item._id">
        <div class="top__content__name">{{item.username}}</div>
        <div class="top__content__id">Id:{{item._id}}</div>
        <div class="top__bottom">
          <div class="top__bottom__point">
            <div class="top__bottom__point__desc">ポイント</div>
            <div class="top__bottom__point__count">123</div>
          </div>
          <div class="top__bottom__coupon">
            <div class="top__bottom__coupon__desc">クーポン</div>
            <div class="top__bottom__coupon__count">3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="userInfo">
      <div class="userInfo__wallet">
        <img class="userInfo__wallet__img" src="../../style/img/money.png" alt />
        <div class="userInfo__wallet__desc">私の財布</div>
        <span class="userInfo__wallet__icon iconfont">&#xe618;</span>
      </div>
      <router-link :to="{ name: 'Address' }">
        <div class="userInfo__address">
          <img class="userInfo__address__img" src="../../style/img/address.png" alt />
          <div class="userInfo__address__desc">私の住所</div>
          <span class="userInfo__address__icon iconfont">&#xe618;</span>
        </div>
      </router-link>
      <div class="userInfo__service">
        <img class="userInfo__service__img" src="../../style/img/help.png" alt />
        <div class="userInfo__service__desc">カスタマーサービス</div>
        <span class="userInfo__service__icon iconfont">&#xe618;</span>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'

// ユーザ情報
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
export default {
  name: 'MyPage',
  components: { Docker },
  setup () {
    const { getUserInfo, data } = getUserInfoEffect()
    getUserInfo()
    return { data }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriable.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.top {
  position: relative;
  top: 0;
  height: 2.5rem;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  &__img {
    position: absolute;
    width: 0.94rem;
    height: 0.94rem;
    margin: 0.61rem 1.41rem 0 1.41rem;
    border-radius: 50%;
    z-index: 99;
  }
  &__content {
    position: absolute;
    width: 3.4rem;
    height: 2.03rem;
    background: $bgColor;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.08rem;
    top: 1.08rem;
    margin: 0 0.18rem;
    z-index: 0;
    &__name {
      font-size: 0.24rem;
      color: #262628;
      text-align: center;
      line-height: 0.36rem;
      margin: 0.6rem 0.84rem 0.02rem 0.84rem;
    }
    &__id {
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
      margin-bottom: 12rem;
    }
  }
  &__bottom {
    display: flex;
    position: absolute;
    width: 100%;
    height: 0.76rem;
    top: 1.26rem;
    border-top: 0.01rem solid $content-bgColor;
    &__point {
      flex: 1;
      padding-top: 0.12rem;
      text-align: center;
      &__desc {
        font-size: 0.12rem;
        color: #c1c0c9;
      }
      &__count {
        padding-top: 0.1rem;
        font-size: 0.2rem;
        color: #262628;
      }
    }
    &__coupon {
      flex: 1;
      text-align: center;
      padding-top: 0.12rem;
      &__desc {
        font-size: 0.12rem;
        color: #c1c0c9;
      }
      &__count {
        padding-top: 0.1rem;
        font-size: 0.2rem;
        color: #262628;
      }
    }
  }
}
.userInfo {
  width: 3.4rem;
  height: 1.46rem;
  margin: 0.77rem 0.18rem;
  background: $bgColor;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  a {
    text-decoration: none;
  }
  &__wallet {
    display: flex;
    position: relative;
    &__img {
      width: 0.22rem;
      height: 0.22rem;
      margin: 0.17rem 0.17rem 0.24rem 0.17rem;
      background: #ed4a47;
      border-radius: 0.08rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #262626;
      margin: 0.17rem 0 0.24rem 0;
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.17rem;
      color: #c2c4ca;
      transform: rotate(180deg);
    }
  }
  &__address {
    display: flex;
    position: relative;
    &__img {
      width: 0.22rem;
      height: 0.22rem;
      margin: 0 0.17rem 0.24rem 0.17rem;
      background: #32c5ff;
      border-radius: 0.08rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #262626;
      margin: 0 0 0.24rem 0;
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      color: #c2c4ca;
      transform: rotate(180deg);
    }
  }
  &__service {
    display: flex;
    position: relative;
    &__img {
      width: 0.22rem;
      height: 0.22rem;
      background: rgba(144, 19, 254);
      border-radius: 0.08rem;
      margin: 0 0.17rem 0.24rem 0.17rem;
    }
    &__desc {
      font-size: 0.14rem;
      color: #262626;
      margin: 0 0 0.24rem 0;
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      color: #c2c4ca;
      transform: rotate(180deg);
    }
  }
}
</style>
