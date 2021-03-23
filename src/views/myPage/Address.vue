<template>
  <div class="wrapper">
    <div class="title">
      <router-link :to="{name:'MyPage'}">
        <div class="title__icon iconfont">&#xe618;</div>
      </router-link>
      <div class="title__text">私の住所</div>
      <router-link :to="{ name:'NewAddress'}">
        <div class="title__function">追加</div>
      </router-link>
    </div>
    <div class="address" v-for="item in AddressList" :key="item._id">
      <div class="address__top">
        <div class="address__top__name">{{item.name}}</div>
        <div class="address__top__num">{{item.phone}}</div>
      </div>
      <div class="address__text">{{`${item.city} ${item.department} ${item.houseNumber}`}}</div>
      <router-link :to="`/myPage/address/${item._id}`">
        <div class="address__icon iconfont">&#xe618;</div>
      </router-link>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>
<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'
// 住所
const useAddressListEffect = () => {
  const AddressList = ref([])
  const getAdderssList = async () => {
    const result = await get('/api/user/address')
    if (result?.errno === 0 && result?.data?.length) {
      AddressList.value = result.data
    }
  }
  return { AddressList, getAdderssList }
}

export default {
  components: { Docker },
  setup () {
    const { AddressList, getAdderssList } = useAddressListEffect()
    getAdderssList()
    return { AddressList }
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/viriable.scss';
@import '../../style/mixins.scss';
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.title {
  display: flex;
  position: relative;
  height: 0.44rem;
  background: $bgColor;
  color: $content-fontcolor;
  text-align: center;
  font-size: 0.16rem;
  &__icon {
    position: absolute;
    top: 0.11rem;
    left: 0.18rem;
  }
  &__text {
    position: absolute;
    top: 0.11rem;
    left: 1.4rem;
  }
  &__function {
    position: absolute;
    color: $content-fontcolor;
    right: 0.18rem;
    top: 0.11rem;
  }
}
.address {
  width: 3.4rem;
  height: 1.1rem;
  margin: 0.48rem 0.18rem 0.16rem 0.18rem;
  background: $bgColor;
  position: relative;
  &__top {
    display: flex;
    font-size: 0.14rem;
    color: $light-fontColor;
    &__name {
      margin: 0.18rem 0 0.08rem 0.16rem;
    }
    &__num {
      margin: 0.18rem 1rem 0.08rem 0.66rem;
    }
  }
  &__text {
    width: 2.6rem;
    height: 0.42rem;
    line-height: 0.21rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    margin: 0 0.63rem 0.18rem 0.16rem;
    @include multiple-ellipsis;
  }
  &__icon {
    position: absolute;
    width: 0.5rem;
    height: 1.1rem;
    top: 0;
    right: 0.15rem;
    line-height: 1.1rem;
    transform: rotate(180deg);
    color: $light-fontColor;
  }
}
</style>
