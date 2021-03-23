<template>
  <div class="order">
    <div class="order__price">合計：{{cartCalculation.price}}</div>
    <div class="order__btn" @click="()=>handleShowConfirmChange(true)">注文確認</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleShowConfirmChange(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">注文確認</h3>
      <p class="mask__content__desc">ご注文内容を今一度ご確認の上、ご注文の確定をお願い致します</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="()=>handleComfirmOrder(true)"
        >かごに入れ</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="()=>handleComfirmOrder(false)"
        >今すぐ買う</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import { useStoreEffect } from '../../effects/cartEffects'

// 注文
const useComfirmOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const handleComfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: product._id, num: product.count })
    }
    // console.log(products)
    try {
      const result = await post('/api/order',
        {
          addressId: '604b5e12cd7af75fe60b8c2a',
          shopId,
          shopName: shopName.value,
          isCanceled,
          products
        })
      console.log(result.data.isCanceled)
      if (result?.errno === 0 && result?.data && result.data.isCanceled === false) {
        store.commit('cleanCartData', shopId)
        router.push({ name: 'OrderList' })
      } else {
        router.push({ name: 'CartList' })
      }
    } catch (e) {
      // showToast('request失敗')
    }
  }
  return { handleComfirmOrder }
}

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { cartCalculation, shopName, productList } = useStoreEffect(shopId)
    const { handleComfirmOrder } = useComfirmOrderEffect(shopId, shopName, productList)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return { cartCalculation, handleComfirmOrder, showConfirm, handleShowConfirmChange }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriable.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  display: flex;
  height: 0.49rem;
  border: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    font-size: 0.14rem;
    text-align: center;
    a {
      text-decoration: none;
      color: $bgColor;
    }
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bgColor;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      font-size: 0.18rem;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid #4fb0f9;
        border: 0.01rem solid #4fb0f9;
        color: $btn-bgColor;
      }
      &--last {
        margin-left: 0.12rem;
        background: $btn-bgColor;
        color: $bgColor;
      }
    }
  }
}
</style>
