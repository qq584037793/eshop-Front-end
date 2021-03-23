<template>
  <div class="wrapper">
    <div class="title">
      <router-link :to="{name:'Address'}">
        <div class="title__icon iconfont">&#xe618;</div>
      </router-link>
      <div class="title__text">編集</div>
      <div class="title__function" @click="updateAddress">保存</div>
    </div>
    <div class="addressCreat">
      <div class="addressCreat__info">
        所在城市：
        <input class="addressCreat__info__input" v-model="data.city" />
      </div>
      <div class="addressCreat__info">
        小区/大厦/学校：
        <input class="addressCreat__info__input" v-model="data.department" />
      </div>
      <div class="addressCreat__info">
        楼号-门牌号：
        <input class="addressCreat__info__input" v-model="data.houseNumber" />
      </div>
      <div class="addressCreat__info">
        收货人：
        <input class="addressCreat__info__input" v-model="data.name" />
      </div>
      <div class="addressCreat__info">
        联系电话：
        <input class="addressCreat__info__input" v-model="data.phone" />
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get, patch } from '../../utils/request'
import Docker from '../../components/Docker'
// 住所の獲得and住所の更新
const useAddressListEffect = () => {
  const route = useRoute()
  const router = useRouter()
  const data = reactive({ city: '', department: '', houseNumber: '', name: '', phone: '' })
  const addressId = route.params.id
  const getAddressDate = async () => {
    const result = await get(`/api/user/address/${addressId}`)
    if (result?.errno === 0 && result?.data) {
      data.city = result.data.city
      data.department = result.data.department
      data.houseNumber = result.data.houseNumber
      data.name = result.data.name
      data.phone = result.data.phone
    }
  }
  const updateAddress = async () => {
    if (addressId) {
      const result = await patch(`/api/user/address/${addressId}`, data)
      if (result?.errno === 0) { router.back() }
    }
  }

  return { data, getAddressDate, updateAddress }
}

export default {
  name: 'UpdateAddress',
  components: { Docker },
  setup () {
    const { data, getAddressDate, updateAddress } = useAddressListEffect()
    getAddressDate()
    return { data, getAddressDate, updateAddress }
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
.addressCreat {
  position: relative;
  margin-top: 0.12rem;
  background: $bgColor;
  font-size: 0.14rem;
  color: #000;
  &__info {
    padding: 0.12rem 0 0.12rem 0.18rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__input {
      display: block;
      width: 100%;
      border: none;
      outline: none;
      padding-top: 0.2rem;
      background: none;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
