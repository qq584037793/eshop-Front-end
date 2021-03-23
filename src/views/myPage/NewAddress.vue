<template>
  <div class="wrapper">
    <div class="title">
      <div class="title__icon iconfont" @click="handleBackClick">&#xe618;</div>
      <div class="title__text">私の住所</div>
      <router-link :to="{ name:'Address'}">
        <div class="title__function" @click="handleAddressCreate">保存</div>
      </router-link>
    </div>
    <div class="addressCreat">
      <div class="addressCreat__info">
        都道府県：
        <input class="addressCreat__info__input" v-model="city" />
      </div>
      <div class="addressCreat__info">
        市区町村番地:
        <input class="addressCreat__info__input" v-model="department" />
      </div>
      <div class="addressCreat__info">
        マンション・ビル名:
        <input class="addressCreat__info__input" v-model="houseNumber" />
      </div>
      <div class="addressCreat__info">
        荷受人：
        <input class="addressCreat__info__input" v-model="name" />
      </div>
      <div class="addressCreat__info">
        電話番号：
        <input class="addressCreat__info__input" v-model="phone" />
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Docker from '../../components/Docker'

// 住所の作成
const useaddressCreate = () => {
  const router = useRouter()
  const data = reactive({ city: '', department: '', houseNumber: '', name: '', phone: '' })
  const handleAddressCreate = async () => {
    try {
      const result = await post('/api/user/address',
        {
          city: data.city,
          department: data.department,
          houseNumber: data.houseNumber,
          name: data.name,
          phone: data.phone
        })
      if (result?.errno === 0) {
        router.push({ name: 'Address' })
      }
    } catch (e) {
    }
  }
  const { city, department, houseNumber, name, phone } = toRefs(data)
  return { city, department, houseNumber, name, phone, handleAddressCreate }
}

const useBack = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'NewAddress',
  components: { Docker },
  setup () {
    const { city, department, houseNumber, name, phone, handleAddressCreate } = useaddressCreate()
    const { handleBackClick } = useBack()
    return { city, department, houseNumber, name, phone, handleAddressCreate, handleBackClick }
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
    flex: 1;
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
  color: $medium-fontColor;
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
    }
  }
}
</style>
